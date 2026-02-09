#!/usr/bin/env python3
"""Generate simple notification sounds for the Pomodoro extension."""

import math
import struct
import wave

SAMPLE_RATE = 44100


def write_wav(path, samples):
    """Write mono 16-bit WAV file."""
    with wave.open(path, "w") as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(SAMPLE_RATE)
        # Clamp and convert to 16-bit
        max_val = max(abs(s) for s in samples) or 1
        scale = 32767 * 0.6 / max_val
        frames = b"".join(
            struct.pack("<h", int(max(-32768, min(32767, s * scale))))
            for s in samples
        )
        wav.writeframes(frames)


def complete_chime():
    """Pleasant chime when timer completes: gentle ascending tones."""
    duration = 1.8  # seconds
    n = int(SAMPLE_RATE * duration)
    samples = [0.0] * n
    # Two-note chime: C5 then E5, with soft attack/decay
    f1, f2 = 523.25, 659.25  # C5, E5
    t_switch = int(0.4 * SAMPLE_RATE)
    for i in range(n):
        t = i / SAMPLE_RATE
        # Envelope: quick attack, gentle decay
        env = math.exp(-t * 2.5) * (1 - math.exp(-t * 30))
        if i < t_switch:
            phase = 2 * math.pi * f1 * t
        else:
            t2 = (i - t_switch) / SAMPLE_RATE
            phase = 2 * math.pi * (f1 * 0.4 + f2 * t2)
        # Soft sine with a hint of harmonic for chime character
        samples[i] = math.sin(phase) * env + 0.2 * math.sin(phase * 2.5) * env
    return samples


def tick():
    """Short subtle tick for optional timer ticking."""
    duration = 0.06  # 60 ms
    n = int(SAMPLE_RATE * duration)
    samples = []
    for i in range(n):
        t = i / SAMPLE_RATE
        # Quick damped click
        env = math.exp(-t * 80)
        freq = 1200
        samples.append(math.sin(2 * math.pi * freq * t) * env)
    return samples


def main():
    import os
    base = os.path.dirname(os.path.abspath(__file__))
    write_wav(os.path.join(base, "complete.wav"), complete_chime())
    write_wav(os.path.join(base, "tick.wav"), tick())
    print("Generated: complete.wav, tick.wav")


if __name__ == "__main__":
    main()
