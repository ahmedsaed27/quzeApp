<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Qize App</title>
        <link rel="stylesheet" href="{{asset('css/app.css')}}">
    </head>
    <body>
        <div class="container">
            <div class="school-name">
                Giza Governorate <br>
                New Vision National Schools
            </div>
            <img src="{{asset('imges/15895052_1872836472935060_4858813208271932985_n.jpg')}}" alt="">
        </div>
        <div class="quiz-app">
            <div class="quiz-info">
                <div class="category">category: <span>English</span></div>
                <div class="count">Questions Count: <span></span></div>
            </div>

            <div class="quiz-area"></div>

            <div class="answers-area"></div>

                <button class="submit-button" id="submit-button">Submit Answer</button>
                <div class="bullets">
                    <div class="spans">

                    </div>
                    <div class="countdown">

                    </div>
                </div>
                <div class="results" id="results">

            </div>
        </div>
        <script src="https://kit.fontawesome.com/71032f77ee.js" crossorigin="anonymous"></script>
        <script src="{{asset('js/app.js')}}"></script>
    </body>
</html>
