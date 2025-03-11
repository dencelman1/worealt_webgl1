export default (
    (a, b) => {
        var vertexShaderSource = `
            attribute vec2 a_position;
            uniform mat4 u_modelViewMatrix;
            void main() {
                gl_Position = u_modelViewMatrix * vec4(a_position, 0.0, 1.0);
            }
        `;

        // Fragment shader source code
        var fragmentShaderSource = `
            precision mediump float;
            void main() {
                gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Red color
            }
        `;

        // Compile shaders
        function compileShader(source, type) {
            var shader = b.createShader(type);
            b.shaderSource(shader, source);
            b.compileShader(shader);
            if (!b.getShaderParameter(shader, b.COMPILE_STATUS)) {
                console.error("Shader compilation failed:", b.getShaderInfoLog(shader));
                b.deleteShader(shader);
                return null;
            }
            return shader;
        }

        var vertexShader = compileShader(vertexShaderSource, b.VERTEX_SHADER);
        var fragmentShader = compileShader(fragmentShaderSource, b.FRAGMENT_SHADER);

        // Create and link the program
        var shaderProgram = b.createProgram();
        b.attachShader(shaderProgram, vertexShader);
        b.attachShader(shaderProgram, fragmentShader);
        b.linkProgram(shaderProgram);

        if (!b.getProgramParameter(shaderProgram, b.LINK_STATUS)) {
            console.error("Program linking failed:", b.getProgramInfoLog(shaderProgram));
        }

        b.useProgram(shaderProgram);

        // Define square vertices (2D)
        var vertices = new Float32Array([
            -0.1, 0.1,  // Top-left
            -0.1, -0.1, // Bottom-left
            0.1, -0.1,  // Bottom-right
            0.1, 0.1    // Top-right
        ]);

        // Create a buffer and load the square vertices
        var positionBuffer = b.createBuffer();
        b.bindBuffer(b.ARRAY_BUFFER, positionBuffer);
        b.bufferData(b.ARRAY_BUFFER, vertices, b.STATIC_DRAW);

        // Get attribute location and enable it
        var positionLocation = b.getAttribLocation(shaderProgram, "a_position");
        b.vertexAttribPointer(positionLocation, 2, b.FLOAT, false, 0, 0);
        b.enableVertexAttribArray(positionLocation);

        // Set up the model-view matrix for transformation
        var uModelViewMatrix = b.getUniformLocation(shaderProgram, "u_modelViewMatrix");

        let d = 1.0; // Initial distance value

        // Function to create a simple transformation matrix with scaling
        var matrix = new Float32Array([
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, -d,  // Translation along the Z-axis
            0.0, 0.0, 0.0, 1.0
        ]);

        // Function to update and draw the scene
        var drawScene = (t) => {
            
            matrix[11] = -d; // Adjust translation (distance)
            
            // Scale the square based on distance (d)
            var scale = 1.0 / d; // The square will appear larger when closer, smaller when farther
            matrix[0] = scale; // Scaling in the X direction
            matrix[5] = scale; // Scaling in the Y direction

            b.clear(b.COLOR_BUFFER_BIT),
            b.uniformMatrix4fv(uModelViewMatrix, false, matrix),
            b.drawArrays(b.TRIANGLE_FAN, 0, 4)
        };
        
        drawScene(0);

        document.addEventListener('keydown', (e) => {
            e.preventDefault();
            e.stopPropagation();
            var k = 0;
            if ((k = e.keyCode) === 87) {  // "w" key
                d -= 0.01;  // Smaller step for smoother transition
                drawScene(0);
            } else if (k === 83) {  // "s" key
                d += 0.01;  // Smaller step for smoother transition
                drawScene(0);
            }
        });
    }
)
