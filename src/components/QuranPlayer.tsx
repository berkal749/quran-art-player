import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

interface QuranTrack {
  id: number;
  title: string;
  reciter: string;
  duration: number;
  audioUrl: string;
}

const QuranPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState([75]);
  const [currentTrack, setCurrentTrack] = useState<QuranTrack>({
    id: 1,
    title: "Al-Fatiha",
    reciter: "Sheikh Abdul Rahman Al-Sudais",
    duration: 180,
    audioUrl: "" // Would be actual audio URL in real implementation
  });

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = (value[0] / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    setVolume(value);
    audio.volume = value[0] / 100;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full max-w-md mx-auto">
      <audio ref={audioRef} />
      
      <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/20 shadow-elegant">
        {/* Album Art */}
        <div className="relative mb-6">
          <div className="w-64 h-64 mx-auto rounded-2xl bg-gradient-to-br from-primary to-primary-glow p-1">
            <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
              <div className="text-6xl font-bold text-primary">القرآن</div>
            </div>
          </div>
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl -z-10" />
        </div>

        {/* Track Info */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">{currentTrack.title}</h2>
          <p className="text-muted-foreground text-lg">{currentTrack.reciter}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Slider
            value={[progress]}
            onValueChange={handleProgressChange}
            max={100}
            step={0.1}
            className="w-full mb-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <Button variant="ghost" size="icon" className="h-12 w-12">
            <SkipBack className="h-6 w-6" />
          </Button>
          
          <Button 
            onClick={togglePlayPause}
            size="icon" 
            className="h-16 w-16 rounded-full bg-primary hover:bg-primary-glow shadow-glow"
          >
            {isPlaying ? (
              <Pause className="h-8 w-8" />
            ) : (
              <Play className="h-8 w-8 ml-1" />
            )}
          </Button>
          
          <Button variant="ghost" size="icon" className="h-12 w-12">
            <SkipForward className="h-6 w-6" />
          </Button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-3">
          <Volume2 className="h-5 w-5 text-muted-foreground" />
          <Slider
            value={volume}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className="flex-1"
          />
          <span className="text-sm text-muted-foreground w-8">{volume[0]}</span>
        </div>
      </Card>
    </div>
  );
};

export default QuranPlayer;