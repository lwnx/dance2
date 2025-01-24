// 全局变量
let currentCategory = 'performances';
let currentTitle = '';
let currentAddress = '';

// AI助手相关配置
const ZHIPU_API_KEY = 'b3553f7f9180412c88cc07464e097d22.jtufNgyZHvo612vr';
const BASE_PROMPT = `你是一位专业的潮汕地区旅游顾问，熟悉潮汕地区的文化、美食、景点和活动。请根据用户的问题，提供专业、友好且详细的建议。

当前系统中已有以下信息：
1. 英歌舞演出信息和时间安排
2. 各区域的停车场信息
3. 特色美食和餐厅推荐

回答要求：
1. 优先推荐系统中已有的活动和地点
2. 建议要具体且实用，包含具体地点、时间建议等
3. 回答要有条理，使用markdown格式组织内容
4. 语气要亲切自然
5. 如果涉及路线，要考虑交通便利性
6. 如果涉及美食，要注意推荐当季特色

用户问题：`;

// 导航相关函数
function showNavMenu(title, address) {
    currentTitle = title;
    currentAddress = address;
    // 检测是否为iOS设备
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    // 显示/隐藏苹果地图按钮
    const appleMapBtn = document.getElementById('appleMapBtn');
    if (appleMapBtn) {
        appleMapBtn.style.display = isIOS ? 'block' : 'none';
    }
    document.getElementById('navMenuPopup').style.display = 'block';
}

function hideNavMenu() {
    document.getElementById('navMenuPopup').style.display = 'none';
}

function tryOpenApp(appUrl, webUrl) {
    // 创建一个隐藏的iframe
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    
    // 记录尝试时间
    const startTime = Date.now();
    
    // 通过iframe尝试打开应用
    iframe.src = appUrl;

    // 设置定时器检查是否成功打开应用
    const timeoutId = setTimeout(() => {
        const duration = Date.now() - startTime;
        // 如果很快就返回了，说明没有安装应用
        if (duration < 2200) {
            window.location.href = webUrl;
        }
        document.body.removeChild(iframe);
    }, 2000);

    // 监听页面显示状态变化
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            clearTimeout(timeoutId);
            document.body.removeChild(iframe);
        }
    }, false);
}

function openAppleMap() {
    const encodedAddress = encodeURIComponent(currentAddress);
    const encodedTitle = encodeURIComponent(currentTitle);
    
    // 构建苹果地图的URL Scheme
    const mapsUrl = `maps://?daddr=${encodedAddress}&t=m`;
    
    // 构建网页版后备URL
    const webUrl = `https://maps.apple.com/?daddr=${encodedAddress}&t=m`;
    
    tryOpenApp(mapsUrl, webUrl);
    hideNavMenu();
}

function openGaodeMap() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    
    // 构建更完整的URL Scheme
    let url;
    if (isIOS) {
        url = `iosamap://path?sourceApplication=导览&dname=${encodeURIComponent(currentAddress)}&dlat=&dlon=&dev=0&t=0`;
    } else if (isAndroid) {
        url = `androidamap://route?sourceApplication=导览&dname=${encodeURIComponent(currentAddress)}&dlat=&dlon=&dev=0&t=0`;
    } else {
        url = `https://uri.amap.com/navigation?to=&name=${encodeURIComponent(currentTitle)}&address=${encodeURIComponent(currentAddress)}&mode=car`;
    }
    
    // 后备URL
    const fallbackUrl = `https://uri.amap.com/navigation?to=&name=${encodeURIComponent(currentTitle)}&address=${encodeURIComponent(currentAddress)}&mode=car`;
    
    tryOpenApp(url, fallbackUrl);
    hideNavMenu();
}

function openBaiduMap() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    
    let url;
    if (isIOS) {
        url = `baidumap://map/direction?destination=${encodeURIComponent(currentAddress)}&mode=driving&coord_type=bd09ll&src=ios.webapp.openAPIDemo`;
    } else if (isAndroid) {
        url = `bdapp://map/direction?destination=${encodeURIComponent(currentAddress)}&mode=driving&coord_type=bd09ll&src=android.webapp.openAPIDemo`;
    } else {
        url = `https://api.map.baidu.com/direction?destination=${encodeURIComponent(currentAddress)}&mode=driving&coord_type=bd09ll&output=html&src=webapp.openAPIDemo`;
    }
    
    const fallbackUrl = `https://api.map.baidu.com/direction?destination=${encodeURIComponent(currentAddress)}&mode=driving&coord_type=bd09ll&output=html&src=webapp.openAPIDemo`;
    
    tryOpenApp(url, fallbackUrl);
    hideNavMenu();
}

async function copyAddress() {
    try {
        await navigator.clipboard.writeText(currentTitle + ' - ' + currentAddress);
        showToast('已复制到剪贴板');
    } catch (err) {
        showToast('复制失败，请手动复制');
    }
    hideNavMenu();
}

function showToast(message) {
    const toast = document.getElementById('copyToast');
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 2000);
}

// 农历转换相关函数
function solarToLunar(dateStr) {
    const date = new Date(dateStr);
    const springFestival2025 = new Date('2025-01-29');  // 2025年春节
    const dayDiff = Math.floor((date - springFestival2025) / (24 * 60 * 60 * 1000));
    
    // 正月日期数组（使用中文大写）
    const firstMonthDays = [
        '正月初一', '正月初二', '正月初三', '正月初四', '正月初五',
        '正月初六', '正月初七', '正月初八', '正月初九', '正月初十',
        '正月十一', '正月十二', '正月十三', '正月十四', '正月十五',
        '正月十六', '正月十七', '正月十八', '正月十九', '正月廿十',
        '正月廿一', '正月廿二', '正月廿三', '正月廿四', '正月廿五',
        '正月廿六', '正月廿七', '正月廿八', '正月廿九', '正月三十'
    ];

    if (dayDiff >= 0 && dayDiff < firstMonthDays.length) {
        return firstMonthDays[dayDiff];
    } else if (dayDiff < 0) {
        // 将腊月的数字转换为中文大写
        return '腊月' + numberToChinese(dayDiff + 30);
    } else {
        // 将二月的数字也转换为中文大写
        return '二月' + numberToChinese(dayDiff - 29);
    }
}

function numberToChinese(num) {
    const numbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
    
    if (num <= 10) {
        return numbers[num];
    } else if (num < 20) {
        return '十' + (num % 10 === 0 ? '' : numbers[num % 10]);
    } else if (num === 20) {
        return '二十';  // 特殊处理20
    } else if (num < 30) {
        return '廿' + numbers[num % 10];
    } else {
        return '三十';
    }
}

// 筛选和搜索相关函数
function initializeFilters() {
    const dates = new Set();
    const districts = new Set();
    const tags = new Set();

    activities[currentCategory].forEach(item => {
        // 只在演出分类下收集日期
        if (currentCategory === 'performances' && item.date) {
            dates.add(item.date);
        }
        if (item.district) {
            districts.add(item.district);
        }
        if (item.tags) {
            item.tags.forEach(tag => tags.add(tag));
        }
    });

    // 只在演出分类下初始化日期筛选器
    const dateFilter = document.getElementById('dateFilter');
    if (currentCategory === 'performances') {
        dateFilter.innerHTML = '<option value="">选择日期</option>';
        [...dates].sort().forEach(date => {
            const option = document.createElement('option');
            option.value = date;
            option.textContent = `${date}（${solarToLunar(date)}）`;
            dateFilter.appendChild(option);
        });
        document.getElementById('dateFilterContainer').style.display = 'block';
    } else {
        dateFilter.innerHTML = '<option value="">选择日期</option>';
        document.getElementById('dateFilterContainer').style.display = 'none';
    }

    const districtFilter = document.getElementById('districtFilter');
    districtFilter.innerHTML = '<option value="">选择区域</option>';
    [...districts].sort().forEach(district => {
        const option = document.createElement('option');
        option.value = district;
        option.textContent = district;
        districtFilter.appendChild(option);
    });

    const tagFilter = document.getElementById('tagFilter');
    tagFilter.innerHTML = '<option value="">选择类型</option>';
    [...tags].sort().forEach(tag => {
        const option = document.createElement('option');
        option.value = tag;
        option.textContent = tag;
        tagFilter.appendChild(option);
    });
}

function switchCategory(category) {
    currentCategory = category;
    document.querySelectorAll('.nav-content a').forEach(a => {
        if (a.getAttribute('onclick').includes(category)) {
            a.classList.add('active');
        } else {
            a.classList.remove('active');
        }
    });

    // 显示/隐藏日历卡片
    const calendarCard = document.querySelector('.calendar-card');
    if (calendarCard) {
        calendarCard.style.display = category === 'performances' ? 'flex' : 'none';
    }

    // 重置搜索和筛选
    document.getElementById('searchInput').value = '';
    initializeFilters();
    search();
}

function search() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const dateFilter = document.getElementById('dateFilter').value;
    const districtFilter = document.getElementById('districtFilter').value;
    const tagFilter = document.getElementById('tagFilter').value;
    
    let results = activities[currentCategory];
    
    // 应用筛选
    results = results.filter(item => {
        const matchSearch = !searchTerm || 
            Object.values(item).some(val => 
                typeof val === 'string' && val.toLowerCase().includes(searchTerm));
        
        // 改进日期匹配逻辑
        let matchDate = true;
        if (dateFilter) {
            const filterDate = new Date(dateFilter);
            const startDate = new Date(item.date);
            const endDate = item.endDate ? new Date(item.endDate) : startDate;
            matchDate = filterDate >= startDate && filterDate <= endDate;
        }
        
        const matchDistrict = !districtFilter || item.district === districtFilter;
        const matchTag = !tagFilter || (item.tags && item.tags.includes(tagFilter));
        
        return matchSearch && matchDate && matchDistrict && matchTag;
    });

    displayResults(results);
}

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    results.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card mb-3';
        if (item.highlight) {
            card.classList.add('highlight-card');
        }

        let content = `
            <div class="card-body">
                <h5 class="card-title">
                    <span>${item.title}</span>
                    <button class="nav-btn" onclick="showNavMenu('${item.title}', '${item.location}')">
                        <i class="fas fa-map-marker-alt"></i>
                        导航
                    </button>
                </h5>
                <div class="card-info">`;

        if (currentCategory === 'performances') {
            const lunarDate = solarToLunar(item.date);
            content += `
                <p><strong>时间：</strong>${item.date}（${lunarDate}）${