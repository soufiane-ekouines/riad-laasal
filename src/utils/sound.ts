class SoundManager {
  private audioCtx: AudioContext | null = null;
  private isEnabled: boolean = false;

  constructor() {
    // Disabled by default as requested
    const saved = localStorage.getItem('riad_sound_enabled');
    this.isEnabled = saved === 'true';
  }

  public getSoundEnabled(): boolean {
    return this.isEnabled;
  }

  public toggleSound(): boolean {
    this.isEnabled = !this.isEnabled;
    localStorage.setItem('riad_sound_enabled', this.isEnabled ? 'true' : 'false');
    if (this.isEnabled) {
      this.playDropSound();
    }
    return this.isEnabled;
  }

  public playDropSound() {
    if (!this.isEnabled) return;

    try {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.audioCtx = new AudioContextClass();
      }

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const now = this.audioCtx.currentTime;

      // Primary liquid droplet oscillator
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      // Pitch drop resembling a pure honey droplet falling into liquid
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.12);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // Audio not permitted or supported
    }
  }
}

export const soundManager = new SoundManager();
