document.addEventListener('DOMContentLoaded', function() {
    let intervalId = null;
    let isPaused = false;
    let plusButton = document.getElementById("plus");
    let minusButton = document.getElementById("minus");
    let heartButton = document.getElementById("heart");
    let pauseButton = document.getElementById("pause");
    let submitButton = document.getElementById("submit");

    function startCounter() {
        intervalId = setInterval(incrementCounter, 1000);
    }
    function stopCounter() {
        clearInterval(intervalId);
    }

    function togglePause() {
        isPaused = !isPaused;
        if (isPaused) {
            stopCounter();
            plusButton.disabled = true;
            minusButton.disabled = true;
            heartButton.disabled = true;
            submitButton.disabled = true;
            pauseButton.innerText = "resume";
        } else {
            startCounter();
            plusButton.disabled = false;
            minusButton.disabled = false;
            heartButton.disabled = false;
            submitButton.disabled = false;
            pauseButton.innerText = "pause";
        }
    }

    function incrementCounter() {
        let currentCount = parseInt(document.getElementById("counter").innerText);
        currentCount += 1;
        document.getElementById("counter").innerText = currentCount;
    }

    function decrementCounter() {
        let currentCount = parseInt(document.getElementById("counter").innerText);
        currentCount -= 1;
        document.getElementById("counter").innerText = currentCount;
    }

    plusButton.addEventListener("click", incrementCounter);
    minusButton.addEventListener("click", decrementCounter);
    heartButton.addEventListener("click", addLike);
    pauseButton.addEventListener("click", togglePause);
    submitButton.addEventListener("click", addComment);

    let likesCount = {};

    function addLike() {
        let currentLikeNumber = document.getElementById("counter").innerText;
        likesCount[currentLikeNumber] = (likesCount[currentLikeNumber] || 0) + 1;

        let listItem = document.createElement('li');
        listItem.innerText = `Number ${currentLikeNumber} has been liked ${likesCount[currentLikeNumber]} time${likesCount[currentLikeNumber] > 1 ? 's' : ''}`;

        let likesList = document.getElementsByClassName("likes");
        if (likesList && likesList[0]) {
            likesList[0].appendChild(listItem);
        }
    }

    function addComment(event) {
        event.preventDefault();
        let newCommentText = document.getElementById("comment-input").value;
        if (newCommentText.trim() === "") return;

        let newComment = document.createElement('div');
        newComment.innerText = newCommentText;

        let commentList = document.getElementById("list");
        commentList.appendChild(newComment);

        document.getElementById("comment-input").value = "";
    }
});