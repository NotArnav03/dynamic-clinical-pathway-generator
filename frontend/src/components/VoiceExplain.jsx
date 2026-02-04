export default function VoiceExplain({ steps }) {
    const speak = () => {
        if (!steps.length) return;
        const text = steps.join(". ");
        const u = new SpeechSynthesisUtterance(text);
        u.rate = 0.9;
        speechSynthesis.speak(u);
    };

    return (
        <button className="icon-btn" onClick={speak}>
            🔊 Explain
        </button>
    );
}
