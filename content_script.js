


function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

function createClass(name,rules){
    var style = document.createElement('style');
    style.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(style);
    if(!(style.sheet||{}).insertRule) 
        (style.styleSheet || style.sheet).addRule(name, rules);
    else
        style.sheet.insertRule(name+"{"+rules+"}",0);
}
createClass('.pronounify', `
    background: purple;
    padding: 0.1em 0.4em;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    margin-left: 0.25rem;
`);

function getPronouns(user) {
    const pronouns = {
        'MikeyKoppJ': {
            color: 'purple',
            text: 'he/him',
        },
    };
    console.log(pronouns[user]);
    return pronouns[user].text;
}

document.addEventListener('readystatechange', (event) => {
    const names = document.querySelectorAll('.css-1dbjc4n.r-6gpygo.r-14gqq1x span span.css-901oao');
    for (const n of names) {
        console.log('n');
        let ele = document.createElement('div');
        ele.classList.add('pronounify');
        ele.innerHTML = getPronouns('MikeyKoppJ');
        insertAfter(ele, n);
    }
});
console.log('invoked');