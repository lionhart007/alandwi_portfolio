import { useEffect, useRef } from 'react';

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
    if (!gl) return;

    let animationFrameId: number;
    let resizeObserver: ResizeObserver;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;

      void main() {
          vec2 uv = gl_FragCoord.xy / u_resolution.xy;
          float time = u_time * 0.2;
          
          // Create a smooth, flowing organic gradient field
          float n = sin(uv.x * 3.0 + time) * cos(uv.y * 2.0 - time * 0.5);
          float n2 = sin(uv.y * 4.0 - time * 0.8) * cos(uv.x * 2.0 + time * 0.3);
          
          vec3 color1 = vec3(0.992, 0.988, 0.984); // #FDFCFB (Off-white)
          vec3 color2 = vec3(0.961, 0.961, 0.941); // #F5F5F0 (Warm ivory)
          vec3 accent1 = vec3(0.898, 0.898, 0.882); // #E5E5E1 (Soft warm gray)
          vec3 accent2 = vec3(0.945, 0.937, 0.910); // Warm paper tint
          
          vec3 finalColor = mix(color1, color2, uv.y + n * 0.1);
          finalColor = mix(finalColor, accent1, clamp(n * n2 * 0.2, 0.0, 1.0));
          finalColor = mix(finalColor, accent2, clamp(n2 * 0.1, 0.0, 1.0) * (1.0 - uv.y));
          
          // Vignette
          float vignette = 1.0 - smoothstep(0.4, 1.4, length(uv - 0.5));
          finalColor = mix(finalColor, finalColor * vignette, 0.3); // Gentle vignette
          
          gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    function compileShader(type: number, source: string): WebGLShader | null {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = compileShader(gl.VERTEX_SHADER, vs);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fs);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ]), gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const uTimeLoc = gl.getUniformLocation(program, 'u_time');
    const uResolutionLoc = gl.getUniformLocation(program, 'u_resolution');

    const syncSize = () => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        syncSize();
      });
      resizeObserver.observe(canvas);
    }
    syncSize();

    const render = (time: number) => {
      syncSize();
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      if (uTimeLoc) gl.uniform1f(uTimeLoc, time * 0.001);
      if (uResolutionLoc) gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 opacity-50 pointer-events-none">
      <canvas ref={canvasRef} className="block w-full h-full" id="canvas-shader-background" />
    </div>
  );
}
