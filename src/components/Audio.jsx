import { useEffect, useRef } from "react";

function Audio({ media }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [media]); // Re-run this effect whenever `medi` changes

  return (
    <audio
      controls
      className="w-full container mx-auto"
      ref={audioRef}
      autoPlay
    >
      <source src={media} type="audio/mp3" />
      Your browser does not support the audio tag.
    </audio>
  );
}

export default Audio;
