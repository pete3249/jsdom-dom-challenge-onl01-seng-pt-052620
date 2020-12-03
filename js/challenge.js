// counter and likesCounter are stored in object

class Counter {
    constructor() {
        this.minusButton = document.querySelector('#minus')
        this.plusButton = document.querySelector('#plus')
        this.heartButton = document.querySelector('#heart')
        this.pauseButton = document.querySelector('#pause')
        this.count = 0;
        this.likesCount = {};
        this.counterH1 = document.querySelector('h1#counter')
        this.likesList = document.querySelector('ul.likes')

        this.interval = setInterval(() => this.incrementCount(), 1000)
    }

    incrementCount() {
        this.counterH1.innerText = this.count += 1;
    }

    decrementCount() {
        this.counterH1.innerText = this.count -= 1;
    }

    increaseLikes() {
        // we need this method to also create/update an li tag displaying the 
        // number of likes that this.count has
        if(this.likesCount[this.count]) {
            // if we already liked this, add a like to the stored number of likes
            // find the li displaying that number and update it
            let newLikeCount = this.likesCount[this.count] += 1;
            this.likesList.querySelector(`#num${this.count}`).innerText = 
            `Number ${this.count} has ${newLikeCount} likes`
            return newLikeCount;
        }   
        else {
            // if we haven't liked this number year, then say we've liked it one time
            // Add an li to ul.likes containing the number and the like count
            this.likesCount[this.count] = 1
            let newLike = document.createElement('li');
            newLike.id = `num${this.count}`;
            newLike.innerText = `Number ${this.count} has 1 like`
            this.likesList.appendChild(newLike)
            return 1;
        }
    }

    pause() {
        clearInterval(this.interval)
        this.minusButton.disabled = true
        this.plusButton.disabled = true
        this.heartButton.disabled = true
        this.pauseButton.innerText = "resume"
        this.pauseButton.id = "resume"
    }

    resume() {
        this.interval = setInterval(() => this.incrementCount(), 1000)
        this.minusButton.disabled = false
        this.plusButton.disabled = false
        this.heartButton.disabled = false
        this.pauseButton.innerText = "pause"
        this.pauseButton.id = "pause"
    }
}

class CommentsList {
    constructor() {
        this.comments = [];
        this.list = document.querySelector('#list');
        this.commentInput = document.querySelector('#comment-input');
    }

    addComment() {
        let comment = this.commentInput.value;
        this.comments.push(comment);
        let p = document.createElement('p');
        p.innerText = comment;
        this.list.appendChild(p);
        this.commentInput.value = "";
    }
}

// start counter when loaded 
document.addEventListener('DOMContentLoaded', function(event) {
    // can now refer to counter object
    Counter.started = new Counter();
    CommentsList.active = new CommentsList();
    attachListeners();
})

function attachListeners() {
    document.addEventListener('click', function(event) {
        let target = event.target
        if (target.matches('#plus')) {
            Counter.started.incrementCount()
        } else if (target.matches('#minus')) {
            Counter.started.decrementCount()
        } else if (target.matches('#heart')) {
            Counter.started.increaseLikes()
        } else if (target.matches('#pause')) {
            Counter.started.pause();
        } else if (target.matches('#resume')) {
            Counter.started.resume();
        }   
    })

    document.addEventListener('submit', function(event) {
        let target = event.target;
        if(event.target.matches('#comment-form')){
            event.preventDefault();
            CommentsList.active.addComment();
        }
    })
}