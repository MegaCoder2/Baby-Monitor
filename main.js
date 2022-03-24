video = ""
var ml5status = ""
var result = []
var errordetect = false
var sound
function preload()
{
    sound = loadSound("alarm_clock_1.mp3")
}
function setup()
{
    canvas = createCanvas(640, 420)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    objectDetection = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting Objects... (Loading Object Detector)"
}
function modelLoaded()
{
    console.log("Model loaded successfully!")
    ml5status = true
}
function gotResult(error, results)
{
    if(error)
    {
        console.log("An error occured:" + error)
        errordetect = true
    }
    else
    {
        console.log(results)
        result = results
    }
}
function draw()
{
    image(video, 0, 0, 640, 420)
    if(ml5status != "")
    {
        objectDetection.detect(video, gotResult)
        for(var i = 0; i < result.length; i++)
        {
            fill("#ff0000")
            text(result[i].label + " (confidence: " + Math.round(result[i].confidence * 100) + "%)", result[i].x + 7.5, result[i].y + 15)
            noFill()
            stroke("#ff0000")
            rect(result[i].x, result[i].y, result[i].width, result[i].height)
            document.getElementById("status").innerHTML = "Status: Detecting Objects..."
            if(result[i].label != "person")
            {
                document.getElementById("objectsdetected").innerHTML = "Baby not detected!"
                sound.play()
                console.log("sound is playing")
            }
            else
            {
                document.getElementById("objectsdetected").innerHTML = "Baby detected!"
                sound.stop()
                console.log("sound is stopped")
            }
            if(result.length == 0)
            {
                document.getElementById("objectsdetected").innerHTML = "Baby not detected!"
                sound.play()
                console.log("sound is playing")
            }
        }
        document.getElementById("status").innerHTML = "Status: Detecting Objects... (Detected Objects)"
    }
    if(errordetect == true)
    {
        document.getElementById("status").innerHTML = "An error occured, try again later."
    }
} 