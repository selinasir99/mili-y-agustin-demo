/**
 * Audio engine for background music.
 * Streams 'New West - Those Eyes' from Cloudinary with continuous looping and 35% volume,
 * with automatic local fallback and DOM attachment for browser compatibility.
 */

const CLOUDINARY_AUDIO_URL = 'https://res.cloudinary.com/ebgka25i/video/upload/v1785974358/New_West_-_Those_Eyes_Lyrics_ytlln5.mp3';
const LOCAL_AUDIO_URL = '/audio/those-eyes.mp3';

class LuxuryAudioEngine {
  private audio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private readonly initialVolume: number = 0.35;
  private currentSourceIndex: number = 0;
  private sources: string[] = [CLOUDINARY_AUDIO_URL, LOCAL_AUDIO_URL];

  constructor() {
    if (typeof window !== 'undefined') {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.initAudio());
      } else {
        this.initAudio();
      }
    }
  }

  private initAudio() {
    if (!this.audio && typeof window !== 'undefined' && document.body) {
      this.audio = document.createElement('audio');
      this.audio.style.display = 'none';
      this.audio.loop = true;
      this.audio.volume = this.initialVolume;
      this.audio.preload = 'auto';
      this.audio.setAttribute('playsinline', 'true');
      this.audio.setAttribute('webkit-playsinline', 'true');

      this.audio.src = this.sources[this.currentSourceIndex];

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.isMuted = false;
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
      });

      this.audio.addEventListener('error', (e) => {
        console.warn('Audio source error on index', this.currentSourceIndex, e);
        this.tryNextSource();
      });

      document.body.appendChild(this.audio);
    }
  }

  private tryNextSource() {
    if (this.currentSourceIndex < this.sources.length - 1) {
      this.currentSourceIndex++;
      if (this.audio) {
        console.log('Switching audio source to fallback:', this.sources[this.currentSourceIndex]);
        this.audio.src = this.sources[this.currentSourceIndex];
        this.audio.load();
        if (this.isPlaying) {
          this.audio.play().catch((err) => console.warn('Fallback play error:', err));
        }
      }
    }
  }

  public start() {
    this.initAudio();
    if (!this.audio) return;

    this.audio.volume = this.initialVolume;
    this.audio.muted = false;
    this.isMuted = false;

    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          this.isMuted = false;
        })
        .catch((err) => {
          console.warn('Audio play error, trying next source:', err);
          this.tryNextSource();
        });
    }
  }

  public toggleMute(): boolean {
    if (!this.audio) {
      this.initAudio();
    }

    if (!this.audio) return false;

    if (this.audio.paused || this.isMuted) {
      this.audio.muted = false;
      this.audio.volume = this.initialVolume;
      const promise = this.audio.play();
      if (promise !== undefined) {
        promise.catch((err) => {
          console.warn('Play error on toggleMute:', err);
          this.tryNextSource();
        });
      }
      this.isMuted = false;
      this.isPlaying = true;
      return false; // Not muted (playing)
    } else {
      this.audio.pause();
      this.isMuted = true;
      this.isPlaying = false;
      return true; // Muted (paused)
    }
  }

  public stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    this.isPlaying = false;
  }

  public getIsPlaying(): boolean {
    if (this.audio) {
      return !this.audio.paused && !this.audio.ended;
    }
    return this.isPlaying;
  }

  public getIsMuted(): boolean {
    if (this.audio) {
      return this.audio.paused || this.audio.muted;
    }
    return this.isMuted;
  }
}

export const audioEngine = new LuxuryAudioEngine();



