document.addEventListener("DOMContentLoaded", function () {
    // 获取所有 .cell 类的元素
    var cells = document.querySelectorAll(".cell");

    // 遍历所有 .cell 元素并为它们添加点击事件监听器
    cells.forEach(function (cell) {
      cell.addEventListener("click", setGrid);
    });
  });

  let dir_text = ["上", "右", "下", "左"];

  let cells = document.getElementsByClassName("cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("mousedown", (e) => {
      let val = parseInt(cells[i].textContent) || 0;
      if (e.offsetX > e.target.offsetWidth / 2) {
        val++;
      } else {
        val--;
      }

      if (val <= 0) val = "";
      if (val > 11) {
        console.log(val);
        val = 11;
      }
      cells[i].textContent = val;
      if (val != "") {
        cells[i].style.backgroundImage = `url(./static/Image/${val}.png)`;
      } else {
        cells[i].style.backgroundImage = ``;
      }
      setGrid();
    });
  }

  function getGrid(dir) {
    let json = JSON.parse(localStorage["gameState"]);
    let cell = json.grid.cells;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        let cellDiv = document.getElementById(`grid_${j}_${i}`);
        if (cell[i][j] != null) {
          let val = Math.log2(cell[i][j].value);
          if (val > 11) val = 11;
          cellDiv.textContent = val;
          cellDiv.style.backgroundImage = `url(./static/Image/${val}.png)`;
        } else {
          cellDiv.textContent = "";
          cellDiv.style.backgroundImage = ``;
        }
      }
    }

    if (dir !== undefined) {
      console.log(dir);
      document.getElementById("dir").innerHTML = dir_text[dir];
    }
  }

  function setGrid() {
    let data = {
      grid: {
        size: 4,
        cells: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
      score: 0,
      over: false,
      won: false,
      keepPlaying: false,
    };

    let eleven = 13;
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        let d = document.getElementById(`grid_${x}_${y}`).textContent;
        if (d > 0) {
          if (d == 11) {
            d = eleven++;
          }
          data.grid.cells[y][x] = {
            position: { x: y, y: x },
            value: Math.pow(2, d),
          };
        }
      }
    }
    localStorage["gameState"] = JSON.stringify(data);
    game.setup();
  }

  function clear1() {
    console.log("clear");
    let data = {
      grid: {
        size: 4,
        cells: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
      score: 0,
      over: false,
      won: false,
      keepPlaying: false,
    };
    localStorage["gameState"] = JSON.stringify(data);
    getGrid();
  }

  getGrid();