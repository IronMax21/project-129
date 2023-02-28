song1 = "";
song2 = "";
song1_status = "";
song2_status = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
function preload()
{
    song1 = loadSound("song1.mp3");
    song2 = loadSound("song2.mp3");
}
function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded()
{
    console.log("posenet is initialized");
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = "+scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Left Wrist X = "+leftWristX+"  left wrist Y = "+leftWristY);
        console.log("Right Wrist X = "+rightWristY+"  right wrist Y = "+rightWristY);
    }
}
function draw()
{
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("white");
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if(song1_status == false)
        {
            song1.play();
            document.getElementById("song").innerHTML = " play song 1";
        }
        
    }
    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if(song2_status == false)
        {
            song2.play();
            document.getElementById("song").innerHTML = " play song 2";
        }
        
    }
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}