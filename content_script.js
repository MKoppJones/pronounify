function insertAfter(newNode, existingNode) {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

function createClass(name, rules) {
  var style = document.createElement('style');
  style.type = 'text/css';
  document.getElementsByTagName('head')[0].appendChild(style);
  if (!(style.sheet || {}).insertRule)
    (style.styleSheet || style.sheet).addRule(name, rules);
  else
    style.sheet.insertRule(name + "{" + rules + "}", 0);
}

function getPronouns(user) {
  console.log(user);
  const pronouns = {
    '@MikeyKoppJ': {
      color: 'purple',
      flag: 'lgbt',
      text: 'he/him',
    },
  };
  return pronouns[user];
}

const Pronounify = {
  init() {
    createClass('.pronounify .overlay', `
      position: absolute;
      height: 100%;
      width: 100%;
      border-radius: 3px;
      display: flex;
      justify-content: center;
      text-shadow:
        -1px 1px 0 #000,
        1px 1px 0 #000,
        1px -1px 0 #000,
        -1px -1px 0 #000;
      font-size: 14px;
      color: white;
    `);
    createClass('.pronounify .flag', `
      position: absolute;
      height: 100%;
      width: 100%;
      border-radius: 3px;
      filter: brightness(95%);
    `);
    createClass('.pronounify', `
      display: inline-flex;
      margin: 0 0.25rem;
      position: relative;
      width: 4rem;
      height: 1rem;
      padding: 0.1rem 0.2rem;
    `);
    createClass('.lgbt', `
      background: linear-gradient(
        180deg, 
        #FE0000 16.66%,
        #FD8C00 16.66%, 33.32%,
        #FFE500 33.32%, 49.98%,
        #119F0B 49.98%, 66.64%,
        #0644B3 66.64%, 83.3%,
        #C22EDC 83.3%
      );
    `);
    createClass('.asexual', `
      background: linear-gradient(
        180deg,
        #181818 25%,
        #A3A3A3 25%, 50%,
        #FFFFFF 50%, 75%,
        #800080 75%
      );
    `);
    createClass('.bisexual', `
      background: linear-gradient(
        180deg, 
        #D60270 40%,
        #9B4F96 40%, 60%,
        #0038A8 60%
      );
    `);
    createClass('.nonbinary', `
      background: linear-gradient(
        180deg,
        #FFF430 25%,
        #FFFFFF 25%, 50%,
        #9C59D1 50%, 75%,
        #181818 75%
      );
    `);
    createClass('.transgender', `
      background: linear-gradient(
        180deg,
        #5BCEFA 20%,
        #F5A9B8 20%, 40%,
        #FFFFFF 40%, 60%,
        #F5A9B8 60%, 80%,
        #5BCEFA 80%
      );
    `);
    Pronounify.start();
  },
  start() {
    setTimeout(() => {
      Pronounify.addPronouns();
      Pronounify.start();
    }, 3000);
  },
  extractNameFromTweet(tweet) {
    return tweet.parentElement.parentElement.parentElement.nextSibling.querySelector('span').innerHTML;
  },
  extractNameFromProfile(profile) {
    return profile.parentElement.parentElement.parentElement.nextSibling.querySelector('span').innerHTML;
  },
  createPronoun(element, user) {
    let pronounContainer = document.createElement('div');
    pronounContainer.classList.add('pronounify');

    let flag = document.createElement('div');
    flag.classList.add('flag', user.flag);

    let pronounText = document.createElement('div');
    pronounText.classList.add('overlay');
    pronounText.innerHTML = user.text;

    pronounContainer.appendChild(flag);
    pronounContainer.appendChild(pronounText);
    insertAfter(pronounContainer, element);
  },
  addPronounsToTweet(tweet) {
    if (!tweet.parentElement.querySelector('.pronounify')) {
      const userName = Pronounify.extractNameFromTweet(tweet);
      const user = getPronouns(userName);
      this.createPronoun(tweet, user);
    }
  },
  addPronouns() {
    const mainProfileName = 'div.r-adyw6z:nth-child(1) > span:nth-child(1) > span:nth-child(1)';
    const tweetName = '.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1wbh5a2.r-dnmrzs.r-1ny4l3l div:nth-child(1) > div:nth-child(1) > span:nth-child(1) > span:nth-child(1)';
    
    const profileNames = document.querySelectorAll(mainProfileName);
    for (const profile of profileNames) {
      if (!profile.parentElement.querySelector('.pronounify')) {
        const userName = Pronounify.extractNameFromProfile(profile);
        const user = getPronouns(userName);
        this.createPronoun(profile, user);
      }
    }

    const tweetNames = document.querySelectorAll(tweetName);
    for (const tweet of tweetNames) {
      Pronounify.addPronounsToTweet(tweet);
    }
  },
};

Pronounify.init();