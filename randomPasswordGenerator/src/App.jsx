import { useState , useCallback, useRef} from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(16);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [specialCharAllowed, setSpecialCharAllowed] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';
    let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    if (numberAllowed) {
      characters += numbers;
    }

    if (specialCharAllowed) {
      characters += specialChars;
    }

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }

    setPassword(generatedPassword);
  }, [length, numberAllowed, specialCharAllowed]);

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPasswordStrength = () => {
    if (!password) return { text: '', color: '', width: 0 };
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(password)) strength++;

    if (strength <= 1) return { text: 'Weak', color: 'bg-red-500', width: 25 };
    if (strength === 2) return { text: 'Fair', color: 'bg-yellow-500', width: 50 };
    if (strength === 3) return { text: 'Good', color: 'bg-blue-500', width: 75 };
    return { text: 'Strong', color: 'bg-green-500', width: 100 };
  };

  const strength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-8">
      
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      {/* Main card */}
      <div className="relative w-full max-w-md">
        <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-8 border border-slate-700/50 backdrop-blur-xl">
          
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Password Generator
            </h1>
            <p className="text-slate-400 text-sm">Create secure, random passwords instantly</p>
          </div>

          {/* Password Display Section */}
          {password && (
            <div className="mb-8 space-y-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 blur"></div>
                <div className="relative bg-slate-900 rounded-xl p-4 border border-slate-600 group-hover:border-slate-500 transition">
                  <p className="text-slate-300 text-xs uppercase tracking-widest font-semibold mb-2">Generated Password</p>
                  <p className="text-white font-mono text-lg break-all font-bold tracking-wide">{password}</p>
                </div>
              </div>

              {/* Password Strength */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-xs font-medium">Strength</span>
                  <span className={`text-xs font-bold ${strength.color === 'bg-red-500' ? 'text-red-400' : strength.color === 'bg-yellow-500' ? 'text-yellow-400' : strength.color === 'bg-blue-500' ? 'text-blue-400' : 'text-green-400'}`}>
                    {strength.text}
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full ${strength.color} transition-all duration-500 rounded-full shadow-lg`}
                    style={{ width: `${strength.width}%` }}
                  ></div>
                </div>
              </div>

              {/* Copy Button */}
              <button
                onClick={copyToClipboard}
                className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  copied
                    ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/50 border border-transparent hover:border-purple-400/50'
                }`}
              >
                {copied ? (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy to Clipboard
                  </>
                )}
              </button>
            </div>
          )}

          {/* Settings Section */}
          <div className="space-y-5 mb-8">
            
            {/* Length Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-slate-300 font-semibold text-sm">Password Length</label>
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-bold text-lg">{length}</span>
              </div>
              <input
                type="range"
                min="4"
                max="32"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400 transition"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>4</span>
                <span>32</span>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={numberAllowed}
                  onChange={(e) => setNumberAllowed(e.target.checked)}
                  className="w-5 h-5 rounded accent-purple-500 cursor-pointer"
                />
                <span className="text-slate-300 font-medium text-sm group-hover:text-white transition">Include Numbers (0-9)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={specialCharAllowed}
                  onChange={(e) => setSpecialCharAllowed(e.target.checked)}
                  className="w-5 h-5 rounded accent-purple-500 cursor-pointer"
                />
                <span className="text-slate-300 font-medium text-sm group-hover:text-white transition">Include Special Characters (!@#...)</span>
              </label>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generatePassword}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/50 transform hover:scale-105 active:scale-95 border border-purple-400/30 hover:border-purple-300/50"
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generate Password
            </div>
          </button>
        </div>

        {/* Footer tip */}
        <div className="text-center mt-6 text-slate-400 text-xs">
          <p>🔒 All passwords are generated locally. Your data is never stored.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
