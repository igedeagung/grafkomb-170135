(function (global) {

    var canvas, gl, program, flag=0, shaders=[], program2;

    glUtils.SL.init({ callback: function () { main(); } });

    var scaleLoc; 
    var scale;
    var membesar;
    var theta, thetaLoc;


    function main() {
        // Register Callbacks
        window.addEventListener('resize', resizer);

        // Get canvas element and check if WebGL enabled
        canvas = document.getElementById("glcanvas");
        gl = glUtils.checkWebGL(canvas);


        // program=glUtils.createProgram(gl, vertexShader, fragmentShader);
        
        var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex),
            fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
        var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex),
            fragmentShader2 = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);
            theta = 0.5;
            scale = 1;
        membesar = 1;
        shaders.push(glUtils.createProgram(gl, vertexShader, fragmentShader));
        shaders.push(glUtils.createProgram(gl, vertexShader2, fragmentShader2));
        

        resizer();
    }

    // draw!
    function draw() {
        
         // Clear to black
         gl.clearColor(0.545, 0.000, 0.000, 1.0);

         // Clear canvas
        gl.clear(gl.COLOR_BUFFER_BIT);
        var LineBawah = new Float32Array([
            -0.6, -0.4,
            -0.6, -0.5,
            -0.3, -0.4,
            -0.3, -0.3
        ]);
        var LineTengah = new Float32Array([
            -0.5, -0.33,
            -0.5, +0.33,
            -0.4, +0.3,
            -0.4, -0.3,
        ]);
        var LineAtas = new Float32Array([
            -0.6, +0.4,
            -0.6, +0.5,
            -0.3, +0.4,
            -0.3, +0.3,
        ]);
        var LineTitik = new Float32Array([
            -0.5, +0.53,
            -0.5, +0.63,
            -0.4, +0.6,
            -0.4, +0.5,
        ]);
        var Shape = new Float32Array([
            0.5, 0.63,
            0.4, 0.6,
            0.5, 0.53,
            0.4, 0.6,
            0.5, 0.53,
            0.4, 0.5,
            0.3, 0.4,
            0.6, 0.5,
            0.3, 0.3,
            0.6, 0.5,
            0.3, 0.3,
            0.6, 0.4,
            0.5, 0.33,
            0.4, 0.3,
            0.5, -0.33,
            0.4, 0.3,
            0.5, -0.33,
            0.4, -0.3,
            0.3, -0.4,
            0.6, -0.5,
            0.3, -0.3,
            0.6, -0.5,
            0.3, -0.3,
            0.6, -0.4
        ]);
                // Initialize the shaders and program
        

        program=shaders[0];
        gl.useProgram(program);
        
        thetaLoc = gl.getUniformLocation(program, 'theta');
        drawA(gl.LINE_LOOP, LineAtas, program);
        drawA(gl.LINE_LOOP, LineTengah, program);
        drawA(gl.LINE_LOOP, LineBawah, program);
        drawA(gl.LINE_LOOP, LineTitik, program);

        program2=shaders[1];
        gl.useProgram(program2);
        
        scaleLoc = gl.getUniformLocation(program2, 'scale');
        drawA2(gl.TRIANGLES, Shape, program2);
        requestAnimationFrame(draw);

    }
    function drawA(type, vertices, programs) {
        var n = initBuffers(vertices, programs);
        if (n < 0) {
            console.log('Failed to set the positions of the vertices');
            return;
        }
        gl.drawArrays(type, 0, n);
        
    }
    function drawA2(type, vertices, programs) {
        var n = initBuffers2(vertices, programs);
        if (n < 0) {
            console.log('Failed to set the positions of the vertices');
            return;
        }
        gl.drawArrays(type, 0, n);
        
    }
    function initBuffers2(vertices, programs) {
        var n = vertices.length / 2;

        var vertexBuffer = gl.createBuffer();
        if (!vertexBuffer) {
            console.log('Failed to create the buffer object');
            return -1;
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        var aPosition = gl.getAttribLocation(programs, 'aPosition');
        if (aPosition < 0) {
            console.log('Failed to get the storage location of aPosition');
            return -1;
        }

        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(aPosition);
        
        if (scale >= 1) membesar = -1;
        else if (scale <= -1) membesar = 1;
        scale = scale + (membesar * 0.0135);
        gl.uniform1f(scaleLoc, scale);
        
        return n;
    }
    function initBuffers(vertices, programs) {
        var n = vertices.length / 2;

        var vertexBuffer = gl.createBuffer();
        if (!vertexBuffer) {
            console.log('Failed to create the buffer object');
            return -1;
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        var aPosition = gl.getAttribLocation(programs, 'aPosition');
        if (aPosition < 0) {
            console.log('Failed to get the storage location of aPosition');
            return -1;
        }

        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(aPosition);
        
        theta += Math.PI * 0.0135;
        gl.uniform1f(thetaLoc, theta);
        
        return n;
    }
    
    function resizer() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        
        if(flag==0)
        {
            draw();
            flag=1;
        }
        
    }

})(window || this);
