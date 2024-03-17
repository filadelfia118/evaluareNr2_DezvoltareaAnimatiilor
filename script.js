const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const messageElement = document.getElementById('message');
        messageElement.style.opacity = '1';
        const maze = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];

        const tileSize = 40;
        let playerX = 40;
        let playerY = 40;

        function drawMaze() {
            for (let y = 0; y < maze.length; y++) {
                for (let x = 0; x < maze[y].length; x++) {
                    if (maze[y][x] === 1) {
                        ctx.fillStyle = '#737';
                    } else {
                        ctx.fillStyle = '#1b78b1'; // culoare fundal
                    }
                    ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
                }
            }

            // Marcarea liniei de start cu verde
            ctx.fillStyle = 'green';
            ctx.fillRect(0, 0, tileSize, tileSize);

            // Marcarea liniei de finiș cu roșu
            ctx.fillStyle = 'red';
            ctx.fillRect((maze[0].length - 2) * tileSize, (maze.length - 1) * tileSize, tileSize, tileSize);
        }

        function drawPlayer() {
            const img = new Image();
            img.onload = function() {
                ctx.drawImage(img, playerX, playerY, tileSize, tileSize);
            };
            img.src = 'jerry.png';
        }

        function clearCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        function drawMessage(message) {
            ctx.font = '30px Arial';
            ctx.fillStyle = '#333';
            ctx.fillText(message, canvas.width / 2 - 100, canvas.height / 2);
        }

        function checkCollision(x, y) {
            const tileX = Math.floor(x / tileSize);
            const tileY = Math.floor(y / tileSize);
            return maze[tileY][tileX] === 1;
        }

        function gameLoop() {
            clearCanvas();
            drawMaze();
            drawPlayer();
            if (playerX === (maze[0].length - 2) * tileSize && playerY === (maze.length - 1) * tileSize) {
                const messageElement = document.getElementById('message');
                messageElement.textContent = 'Felicitări, ai câștigat!';
                messageElement.style.display = 'block'; // Afișează mesajul
            } else if (playerX === 0 || playerX === (maze[0].length - 1) * tileSize ||
                       playerY === 0 || playerY === (maze.length - 1) * tileSize) {
                const messageElement = document.getElementById('message');
                messageElement.textContent = 'Mai incearca !!';
                messageElement.style.display = 'block'; // Afișează mesajul
            }
        }

        document.addEventListener('keydown', function(event) {
            const key = event.key;
            let newX = playerX;
            let newY = playerY;
            if (key === 'ArrowRight') {
                newX += tileSize;
            } else if (key === 'ArrowLeft') {
                newX -= tileSize;
            } else if (key === 'ArrowUp') {
                newY -= tileSize;
            } else if (key === 'ArrowDown') {
                newY += tileSize;
            }
            if (!checkCollision(newX, newY)) {
                playerX = newX;
                playerY = newY;
                gameLoop();
            }
        });

        gameLoop();
        function createBackgroundCircles() {
            const background = document.querySelector('.background-circles');
            for (let i = 0; i < 15; i++) { // Adăugăm 15 cercuri
                const circle = document.createElement('div');
                circle.classList.add('circle');
                circle.style.width = `${Math.floor(Math.random() * 50) + 20}px`; // Dimensiuni aleatorii între 20 și 70px
                circle.style.height = circle.style.width;
                circle.style.top = `${Math.random() * 100}%`; // Poziție verticală aleatorie
                circle.style.left = `${Math.random() * 100}%`; // Poziție orizontală aleatorie
                background.appendChild(circle);
            }
        }
        
        createBackgroundCircles();