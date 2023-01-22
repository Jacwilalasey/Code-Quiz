function listScore() {
    var highscores = JSON.parse(window.localStorage.getItem("highscores"));

    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    highscores.forEach(function(score) {
      var liTag = document.createElement("li");
      liTag.textContent = "🎉" + score.initials + " - " + score.score + "🎉";
  
      var listEl = document.getElementById("highscores");
      listEl.appendChild(liTag);
    });
  }
  
  function clearScores () {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }

  document.getElementById("clear").onclick = clearScores;
    
  listScore();
  