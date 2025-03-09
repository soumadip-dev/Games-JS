Array.prototype.shuffleArray = function () {
  let currentIndex = this.length,
    randomIndex,
    tempValue;

  while (currentIndex-- > 0) {
    randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    tempValue = this[randomIndex];
    this[randomIndex] = this[currentIndex];
    this[currentIndex] = tempValue;
  }

  return this;
};
const imagesLinkArray = [
  {
    name: 'Angular',
    url: 'https://media.geeksforgeeks.org/wp-content/uploads/20231122102833/AngularImage.png',
  },
  {
    name: 'HTML',
    url: 'https://media.geeksforgeeks.org/wp-content/uploads/20231122102835/html5Image.png',
  },
  {
    name: 'JavaScript',
    url: 'https://media.geeksforgeeks.org/wp-content/uploads/20231122102834/JSImage.jpg',
  },
  {
    name: 'React',
    url: 'https://media.geeksforgeeks.org/wp-content/uploads/20231122102833/reactImage.png',
  },
  {
    name: 'Vue',
    url: 'https://media.geeksforgeeks.org/wp-content/uploads/20231122102833/vueImage.png',
  },
  {
    name: 'CSS',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyfXdKH7SrCVpLx-h0j9VSLf7LQxwWgptJNw&s',
  },
  {
    name: 'Python',
    url: 'https://freesvg.org/img/387.png',
  },
  {
    name: 'Java',
    url: 'https://logo-download.com/wp-content/data/images/png/Java-logo.png',
  },
];
const duplicateCards = imagesLinkArray.concat(imagesLinkArray);
let shuffleCards = duplicateCards.shuffleArray();


////// Dom Elements
const cardContainer = document.getElementById('gameContainer');
const movesCount = document.getElementById('moves');
const timeCount = document.getElementById('time');
const restartBtn = document.getElementById('restart-game')

////// Global variable
let firstCard = null;
let secondCard = null;
let matchCards = [];
let moveCount = 0;

function createCard({ url, name }) {
  const frontCard = document.createElement('div');
  const backCard = document.createElement('div');
  const card = document.createElement('div');

  card.classList.add('card');
  card.setAttribute('data-name', name); // Store name as attribute
  frontCard.classList.add('card-front');
  frontCard.textContent = '?';
  backCard.classList.add('card-back');
  backCard.innerHTML = `<img src="${url}" alt="${name}">`;

  card.appendChild(frontCard);
  card.appendChild(backCard);

  card.addEventListener('click', () => handleCardClick(card));

  return card;
}

function addCardToDom(){
  shuffleCards.forEach(card => {
    cardContainer.appendChild(createCard(card));
  });
}

function handleCardClick(card) {

  if (matchCards.includes(card)) {
    return;
  }
  if (card === firstCard) return;
  card.classList.add('flipped');
  if (firstCard === null) {
    firstCard = card;
  } else {
    secondCard = card;
    moveCount++;
    if (
      firstCard.getAttribute('data-name') ===
      secondCard.getAttribute('data-name')
    ) {
      matchCards.push(firstCard, secondCard);
      resetSelection();
      if (matchCards.length === 16) {
        setTimeout(() => {
          alert(
            `Congratulations! You completed the game in ${moveCount} moves.`
          );
        }, 0);

      }
    } else {
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetSelection();
      }, 500);
    }
    movesCount.textContent = `${moveCount}`;
  }
}

function resetSelection() {
  firstCard = null;
  secondCard = null;
}
function restartGame() {
  // Reset game variables
  matchCards=[];
  moveCount = 0;
  firstCard = null;
  secondCard = null;

  movesCount.textContent = `${moveCount}`;

  cardContainer.innerHTML = '';
  shuffleCards = duplicateCards.shuffleArray();

  addCardToDom();

}


addCardToDom();
restartBtn.addEventListener('click', restartGame);

