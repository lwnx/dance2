// 读取activity.json文件并生成卡片展示
if (document.getElementById('activity-container')) {
    fetch('data/activity.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('activity-container');
            const totalCount = data.content.length;
            const countDisplay = document.getElementById('activity-count');
            countDisplay.innerText = `${totalCount}/${totalCount}`;

            data.content.forEach(activity => {
                const card = document.createElement('div');
                card.className = 'card activity-card'; // 添加额外的类
                card.dataset.tags = activity.tags.join(' ');
                card.dataset.district = activity.district;
                card.innerHTML = `
                    <h2>${activity.title}</h2>
                    <p class="Detail"><strong class="smalltit">日期:</strong> ${activity.date}${activity.enddate ? ' - ' + activity.enddate : ''}<span class="time">${activity.times.join(', ')}</span></p>
                    <p class="Detail"><strong>团队:</strong> ${Array.isArray(activity.team) ? activity.team.join(', ') : activity.team}</p>                
                    <p class="Detail"><strong>描述:</strong> ${activity.description || '无'}</p>
                    <p class="Detail"><strong>文化意义:</strong> ${activity.culturalMeaning || '无'}</p>
                    <div class="tags-container">${activity.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
                    <div class="split"></div>
                    <div class="gomap">
                        <p class="Detail"><strong>地点:</strong> ${activity.location}</p>
                        <button class="navigate-btn" onclick="navigateTo('${activity.location}')">🚗 导航</button>
                    </div>
                `;
                container.appendChild(card);
            });

            // 筛选功能
            function filterActivities() {
                const tagFilter = document.getElementById('tag-filter').value;
                const districtFilter = document.getElementById('district-filter').value;
                const cards = document.querySelectorAll('.activity-card');
                let visibleCount = 0;

                cards.forEach(card => {
                    const tags = card.dataset.tags.split(' ');
                    const district = card.dataset.district;
                    const matchesTag = tagFilter === 'all' || tags.includes(tagFilter);
                    const matchesDistrict = districtFilter === 'all' || district === districtFilter;

                    if (matchesTag && matchesDistrict) {
                        card.style.display = '';
                        visibleCount++;
                    } else {
                        card.style.display = 'none';
                    }
                });

                countDisplay.innerText = `${totalCount}/${visibleCount}`;
            }

            document.getElementById('tag-filter').addEventListener('change', filterActivities);
            document.getElementById('district-filter').addEventListener('change', filterActivities);
        })
        .catch(error => console.error('Error loading activity data:', error));
}

// 读取food.json文件并生成卡片展示
if (document.getElementById('food-container')) {
    fetch('data/food.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('food-container');
            const totalCount = data.content.length;
            const countDisplay = document.getElementById('food-count');
            countDisplay.innerText = `${totalCount}/${totalCount}`;

            data.content.forEach(food => {
                const card = document.createElement('div');
                card.className = 'card food-card'; // 添加额外的类
                card.dataset.tags = food.tags.join(' ');
                card.dataset.district = food.district;
                card.innerHTML = `
                    <h2>${food.title}</h2>
                    <p class="Detail"><strong class="smalltit">类型:</strong> ${food.type}</p>
                    <p class="Detail"><strong>营业时间:</strong> ${food.businessHours}</p>
                    <p class="Detail"><strong>价格:</strong> ${food.price}</p>
                    <p class="Detail"><strong>特色:</strong> ${food.specialties.join(', ')}</p>
                    <p class="Detail"><strong>描述:</strong> ${food.description || '无'}</p>
                    <p class="Detail"><strong>优势:</strong> ${food.advantages || '无'}</p>
                    <div class="tags-container">${food.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
                    <div class="split"></div>
                    <div class="gomap">
                        <p class="Detail"><strong>地点:</strong> ${food.location}</p>
                        <button class="navigate-btn" onclick="navigateTo('${food.location}')">🚗 导航</button>
                    </div>
                `;
                container.appendChild(card);
            });

            // 筛选功能
            function filterFoods() {
                const tagFilter = document.getElementById('tag-filter').value;
                const districtFilter = document.getElementById('district-filter').value;
                const cards = document.querySelectorAll('.food-card');
                let visibleCount = 0;

                cards.forEach(card => {
                    const tags = card.dataset.tags.split(' ');
                    const district = card.dataset.district;
                    const matchesTag = tagFilter === 'all' || tags.includes(tagFilter);
                    const matchesDistrict = districtFilter === 'all' || district === districtFilter;

                    if (matchesTag && matchesDistrict) {
                        card.style.display = '';
                        visibleCount++;
                    } else {
                        card.style.display = 'none';
                    }
                });

                countDisplay.innerText = `${totalCount}/${visibleCount}`;
            }

            document.getElementById('tag-filter').addEventListener('change', filterFoods);
            document.getElementById('district-filter').addEventListener('change', filterFoods);
        })
        .catch(error => console.error('Error loading food data:', error));
}

// 读取parking.json文件并生成卡片展示
if (document.getElementById('parking-container')) {
    fetch('data/parking.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('parking-container');
            const totalCount = data.content.length;
            const countDisplay = document.getElementById('parking-count');
            countDisplay.innerText = `${totalCount}/${totalCount}`;

            data.content.forEach(parking => {
                const card = document.createElement('div');
                card.className = 'card parking-card'; // 修改类名为 parking-card
                card.dataset.tags = parking.tags.join(' ');
                card.dataset.district = parking.district;
                card.innerHTML = `
                    <h2>${parking.title}</h2>
                    <p class="Detail"><strong>位置:</strong> ${parking.location}</p>
                    <p class="Detail"><strong>地区:</strong> ${parking.district}</p>
                    <p class="Detail"><strong>容量:</strong> ${parking.capacity}</p>
                    <p class="Detail"><strong>类型:</strong> ${parking.type}</p>
                    <p class="Detail"><strong>标签:</strong> ${parking.tags.join(', ')}</p>
                    <p class="Detail"><strong>优势:</strong> ${parking.advantages}</p>
                    <p class="Detail"><strong>描述:</strong> ${parking.description}</p>
                    <div class="tags-container">${parking.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
                    <div class="split"></div>
                    <div class="gomap">
                        <p class="Detail"><strong>地点:</strong> ${parking.location}</p>
                        <button class="navigate-btn" onclick="navigateTo('${parking.location}')">🚗 导航</button>
                    </div>
                `;
                container.appendChild(card);
            });

            // 筛选功能
            function filterParkings() {
                const tagFilter = document.getElementById('tag-filter').value;
                const districtFilter = document.getElementById('district-filter').value;
                const cards = document.querySelectorAll('.parking-card');
                let visibleCount = 0;

                cards.forEach(card => {
                    const tags = card.dataset.tags.split(' ');
                    const district = card.dataset.district;
                    const matchesTag = tagFilter === 'all' || tags.includes(tagFilter);
                    const matchesDistrict = districtFilter === 'all' || district === districtFilter;

                    if (matchesTag && matchesDistrict) {
                        card.style.display = '';
                        visibleCount++;
                    } else {
                        card.style.display = 'none';
                    }
                });

                countDisplay.innerText = `${totalCount}/${visibleCount}`;
            }

            document.getElementById('tag-filter').addEventListener('change', filterParkings);
            document.getElementById('district-filter').addEventListener('change', filterParkings);
        })
        .catch(error => console.error('Error loading parking data:', error));
}

// 导航功能
function navigateTo(location) {
    const encodedLocation = encodeURIComponent(location);
    const baiduMapUrl = `https://map.baidu.com/?q=${encodedLocation}`;
    const gaodeMapUrl = `https://uri.amap.com/search?query=${encodedLocation}`;
    const appleMapUrl = `http://maps.apple.com/?q=${encodedLocation}`;

    const options = `
        <div class="navigate-options">
            <button onclick="window.open('${baiduMapUrl}', '_blank')">百度地图</button>
            <button onclick="window.open('${gaodeMapUrl}', '_blank')">高德地图</button>
            <button onclick="copyToClipboard('${location}')">复制地址</button>
            <button onclick="window.open('${appleMapUrl}', '_blank')">Apple地图</button>
        </div>
    `;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" onclick="event.stopPropagation()">
            <span class="close-btn" onclick="closeModal()">&times;</span>
            ${options}
        </div>
    `;
    modal.addEventListener('click', closeModal);
    document.body.appendChild(modal);
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast('地址已复制到剪贴板');
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        document.body.removeChild(modal);
    }
}
