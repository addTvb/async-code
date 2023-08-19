'use strict';
const button = document.querySelector('#get-url-button');
const clearButton = document.querySelector('#clear-button');
const fetchButton = document.querySelector('#fetch-button');
const sizeBox = document.querySelector('#img-size');
const imgBox = document.querySelector('.img-box');
const loading = document.querySelector('#loading');
const urls = [];
const getPromise = async (url) => await fetch(url);
const getRandomUrl = () => {
    // 826 это максимальное кол-во персонажей
    const randomNum = Math.floor(Math.random() * 826) + 1;
    return `https://rickandmortyapi.com/api/character/avatar/${randomNum}.jpeg`;
};
button.addEventListener('click', () => {
    urls.push(getRandomUrl());
});
clearButton.addEventListener('click', () => {
    urls.length = 0;
    imgBox.textContent = '';
    sizeBox.textContent = '0';
});
fetchButton.addEventListener('click', async () => {
    loading.classList.remove('hide');
    const allPromises = urls.map(async (url) => (await getPromise(url)).blob());
    const allData = await Promise.allSettled(allPromises);
    loading.classList.add('hide');
    const sizeArray = allData.map((data) => data.status === 'fulfilled' && data.value.size);
    const sumBytes = sizeArray.reduce((a, b) => a + b);
    const sumMb = sumBytes / 1024 / 1024;
    sizeBox.textContent = sumMb.toFixed(2);
    imgBox.textContent = '';
    urls.forEach((url) => {
        const img = document.createElement('img');
        const link = document.createElement('a');
        const characterId = url.split('/')[6].split('.')[0];
        link.href = `./character.html?id=${characterId}`;
        img.src = url;
        img.className = 'character-img';
        link.appendChild(img);
        imgBox.appendChild(link);
    });
});
