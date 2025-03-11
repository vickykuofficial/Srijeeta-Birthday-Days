document.addEventListener('DOMContentLoaded', () => {
    // Auto play music (with a slight delay to ensure page is loaded)
    const bgMusic = document.getElementById('bgMusic');
    setTimeout(() => {
        bgMusic.play().catch(error => {
            console.log("Auto-play prevented by browser, user interaction needed to play audio");
        });
    }, 1000);

    // Generate additional balloons
    const balloonsContainer = document.querySelector('.floating-balloons');
    const balloonColors = ['🎈', '🔵', '🟢', '🟣', '🔴', '🟡'];
    
    // Add 15 more balloons with different colors and positions
    for (let i = 0; i < 15; i++) {
        const balloon = document.createElement('span');
        balloon.textContent = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        balloon.style.left = `${Math.random() * 100}%`;
        balloon.style.animationDelay = `${Math.random() * 20}s`;
        balloon.style.animationDuration = `${Math.random() * 10 + 10}s`;
        balloon.style.fontSize = `${Math.random() * 1.5 + 1.5}em`;
        balloonsContainer.appendChild(balloon);
    }

    // Enhanced Cake Cutting Animation
    const cake = document.querySelector('.cake');
    const cakeContainer = document.querySelector('.cake-container');
    let isCut = false;

    // Add a hint to click the cake
    const hintElement = document.createElement('div');
    hintElement.className = 'cake-hint';
    hintElement.textContent = '🎂 Click to cut the cake! 🎂';
    hintElement.style.cssText = `
        position: absolute;
        bottom: -30px;
        left: 0;
        width: 100%;
        text-align: center;
        font-size: 14px;
        color: #6a11cb;
        animation: bounce 1s infinite;
        font-weight: bold;
    `;
    cakeContainer.appendChild(hintElement);

    cake.addEventListener('click', () => {
        if (!isCut) {
            // Hide the hint
            hintElement.style.display = 'none';
            
            // Cake cutting animation
            cake.style.transform = 'scale(1.1) translateY(-10px)';
            
            // Create slice effect
            const sliceEffect = document.createElement('div');
            sliceEffect.className = 'slice-effect';
            sliceEffect.style.cssText = `
                position: absolute;
                top: 50%;
                left: 0;
                width: 100%;
                height: 5px;
                background: rgba(255, 255, 255, 0.8);
                transform: scaleX(0);
                animation: sliceAnim 0.5s forwards;
                z-index: 100;
            `;
            cake.appendChild(sliceEffect);
            
            // Create sparkles around the cake
            for (let i = 0; i < 20; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = 'cake-sparkle';
                sparkle.style.cssText = `
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    background: #ffdd66;
                    border-radius: 50%;
                    top: ${Math.random() * 100}%;
                    left: ${Math.random() * 100}%;
                    opacity: 0;
                    animation: cakeSparkle 1s forwards;
                `;
                cake.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), 1000);
            }
            
            // Create confetti
            createConfetti();
            
            // Ensure music plays on user interaction
            bgMusic.play().catch(error => {
                console.log("Error playing audio:", error);
            });
            
            isCut = true;
            
            // Return cake to normal position after animation
            setTimeout(() => {
                cake.style.transform = 'scale(1)';
                
                // Add "Happy Birthday" text above the cake
                const birthdayText = document.createElement('div');
                birthdayText.className = 'birthday-popup';
                birthdayText.textContent = '🎉 Happy Birthday Srijeeta Dutta! 🎉';
                birthdayText.style.cssText = `
                    position: absolute;
                    top: -120px;
                    left: 0;
                    width: 100%;
                    text-align: center;
                    font-size: 18px;
                    color: #6a11cb;
                    font-weight: bold;
                    opacity: 0;
                    transform: translateY(20px);
                    animation: popupAnim 1s forwards;
                    padding: 10px;
                    background-color: rgba(255, 255, 255, 0.8);
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    z-index: 100;
                `;
                cakeContainer.appendChild(birthdayText);
            }, 500);
        }
    });

    // Confetti Effect
    function createConfetti() {
        const confettiContainer = document.querySelector('.confetti-container');
        const colors = ['#6a11cb', '#2575fc', '#c471ed', '#f64f59', '#ff9a9e', '#fad0c4', '#fbc2eb', '#a18cd1', '#ffecd2', '#ff9a9e'];
        const shapes = ['circle', 'square', 'triangle', 'heart', 'star'];
        const emojis = ['🎉', '🎊', '✨', '💖', '🎈', '🎁', '🍰'];
        
        // Clear any existing confetti
        confettiContainer.innerHTML = '';
        
        // Create emoji confetti
        for (let i = 0; i < 20; i++) {
            const emoji = document.createElement('div');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 20 + 15}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 50}%;
                opacity: 0;
                transform: rotate(${Math.random() * 360}deg);
                animation: emojiConfetti ${Math.random() * 3 + 3}s ease-out forwards;
                z-index: 1000;
                text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            `;
            confettiContainer.appendChild(emoji);
            setTimeout(() => emoji.remove(), 6000);
        }
        
        // Create shape confetti
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const size = Math.random() * 12 + 5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            let shapeStyle = '';
            if (shape === 'circle') {
                shapeStyle = 'border-radius: 50%;';
            } else if (shape === 'triangle') {
                shapeStyle = `
                    width: 0;
                    height: 0;
                    border-left: ${size/2}px solid transparent;
                    border-right: ${size/2}px solid transparent;
                    border-bottom: ${size}px solid ${color};
                    background: transparent;
                `;
            } else if (shape === 'heart') {
                shapeStyle = `
                    background-color: transparent;
                    transform: rotate(45deg);
                    &::before, &::after {
                        content: '';
                        position: absolute;
                        background-color: ${color};
                    }
                    &::before {
                        width: ${size}px;
                        height: ${size}px;
                        border-radius: 50%;
                        top: -${size/2}px;
                        left: 0;
                    }
                    &::after {
                        width: ${size}px;
                        height: ${size}px;
                        border-radius: 50%;
                        top: 0;
                        left: -${size/2}px;
                    }
                `;
            } else if (shape === 'star') {
                shapeStyle = `
                    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
                `;
            }
            
            confetti.style.cssText = `
                position: absolute;
                ${shape !== 'triangle' && shape !== 'heart' ? `width: ${size}px; height: ${size}px;` : ''}
                ${shape !== 'triangle' && shape !== 'heart' ? `background: ${color};` : ''}
                ${shapeStyle}
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                transform: rotate(${Math.random() * 360}deg);
                opacity: 0;
                animation: confettiFall ${Math.random() * 3 + 2}s ease-out forwards;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            `;
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }
        
        // Add animation style
        const confettiStyle = document.createElement('style');
        confettiStyle.textContent = `
            @keyframes emojiConfetti {
                0% { transform: translateY(0) rotate(0deg); opacity: 0; }
                10% { opacity: 1; }
                100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
            }
        `;
        document.head.appendChild(confettiStyle);
    }

    // Add animations style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        
        @keyframes sliceAnim {
            0% { transform: scaleX(0); }
            100% { transform: scaleX(1); }
        }
        
        @keyframes cakeSparkle {
            0% { transform: scale(0); opacity: 1; }
            50% { transform: scale(1.5); opacity: 1; }
            100% { transform: scale(2); opacity: 0; }
        }
        
        @keyframes popupAnim {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    // Sparkle effect on hover
    const birthdayCard = document.querySelector('.birthday-card');
    birthdayCard.addEventListener('mousemove', (e) => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: radial-gradient(circle, #fff 0%, transparent 70%);
            left: ${e.offsetX}px;
            top: ${e.offsetY}px;
            pointer-events: none;
            animation: sparkleAnim 1s forwards;
        `;
        birthdayCard.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    });

    // Add sparkle animation style
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkleAnim {
            0% { transform: scale(0); opacity: 1; }
            100% { transform: scale(2); opacity: 0; }
        }
    `;
    document.head.appendChild(sparkleStyle);
}); 