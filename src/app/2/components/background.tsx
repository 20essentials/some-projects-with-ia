export function Background() {
  return (
    <video
      className='fixed w-full h-screen -z-10 object-cover'
      src='/assets/background-example-1.mp4'
      autoPlay
      muted
      loop
    ></video>
  );
}
