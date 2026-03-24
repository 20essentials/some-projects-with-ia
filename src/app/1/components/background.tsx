'use client';
import { useEffect, useRef } from 'react';

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const NB_ITER = 6;
    const X0 = 1.0,
      X1 = 2.0,
      Y0 = -2.0,
      Y1 = -1.0;

    const canvas = canvasRef.current!;
    const gl = canvas.getContext('webgl')!;

    let animState = 0;
    let widthHandle: WebGLUniformLocation;
    let heightHandle: WebGLUniformLocation;
    let x0Handle: WebGLUniformLocation;
    let x1Handle: WebGLUniformLocation;
    let y0Handle: WebGLUniformLocation;
    let y1Handle: WebGLUniformLocation;
    let timeHandle: WebGLUniformLocation;
    let mposHandle: WebGLUniformLocation;

    const mpos = [0, 0];

    const vertexSource = `attribute vec2 position;void main(){gl_Position=vec4(position,0.0,1.0);}`;
    const fragmentSource = `#define FACTOR 0.02
precision mediump float;
uniform float width,height,x0,x1,y0,y1,time;
uniform vec2 mpos;
vec3 fn(float x,float y){
float x1=x,y1=y,x2,y2,dist=100000.0,thisdist;int kmin=0;
for(int k=0;k<${NB_ITER};++k){
x2=x1*x-y1*y;y2=x1*y+y1*x;
x1=sin(x2+time/4000.0)+mpos.x;
y1=cos(y2+time/9985.0)+mpos.y;
thisdist=min(abs(x1),abs(y1));
if(thisdist<dist){dist=thisdist;kmin=k;}
}
vec3 c;
kmin=kmin-(kmin/6)*6;
if(kmin==0)c=vec3(1.,0.,0.);
else if(kmin==1)c=vec3(1.,1.,0.);
else if(kmin==2)c=vec3(0.,1.,0.);
else if(kmin==3)c=vec3(0.,1.,1.);
else if(kmin==4)c=vec3(0.,0.,1.);
else c=vec3(1.,0.,1.);
return c*(FACTOR/dist);
}
void main(){
vec2 uv=gl_FragCoord.xy;
vec3 col=fn(x0+uv.x*(x1-x0)/min(width,height),y0+uv.y*(y1-y0)/min(width,height));
gl_FragColor=vec4(col,1.);
}`;

    const compile = (src: string, type: number) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const init = () => {
      const program = gl.createProgram()!;
      gl.attachShader(program, compile(vertexSource, gl.VERTEX_SHADER));
      gl.attachShader(program, compile(fragmentSource, gl.FRAGMENT_SHADER));
      gl.linkProgram(program);
      gl.useProgram(program);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]),
        gl.STATIC_DRAW
      );

      const pos = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(pos);
      gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

      widthHandle = gl.getUniformLocation(program, 'width')!;
      heightHandle = gl.getUniformLocation(program, 'height')!;
      x0Handle = gl.getUniformLocation(program, 'x0')!;
      x1Handle = gl.getUniformLocation(program, 'x1')!;
      y0Handle = gl.getUniformLocation(program, 'y0')!;
      y1Handle = gl.getUniformLocation(program, 'y1')!;
      timeHandle = gl.getUniformLocation(program, 'time')!;
      mposHandle = gl.getUniformLocation(program, 'mpos')!;
    };

    const resize = () => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(widthHandle, canvas.width);
      gl.uniform1f(heightHandle, canvas.height);
      gl.uniform1f(x0Handle, X0);
      gl.uniform1f(x1Handle, X1);
      gl.uniform1f(y0Handle, Y0);
      gl.uniform1f(y1Handle, Y1);
    };

    const animate = (t: number) => {
      if (animState === 0) {
        resize();
        animState = 1;
      }
      gl.uniform1f(timeHandle, t);
      gl.uniform2fv(mposHandle, mpos);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      mpos[0] = e.clientX / canvas.width;
      mpos[1] = e.clientY / canvas.height;
    };

    init();
    resize();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className='fixed inset-0 w-full h-full' />;
}
