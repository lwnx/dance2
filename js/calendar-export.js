// 将演出信息转换为iCalendar格式
function convertToICalendar(performance) {
    // 基本事件信息
    const event = {
        start: new Date(performance.date),
        end: performance.endDate ? new Date(performance.endDate) : new Date(performance.date),
        summary: performance.title,
        description: `${performance.description}\n文化意义：${performance.culturalMeaning || ''}`,
        location: performance.location
    };

    // 如果有具体时间，更新开始和结束时间
    if (performance.times && performance.times.length > 0) {
        const [startTime] = performance.times[0].split('-');
        const [hours, minutes] = startTime.split(':');
        event.start.setHours(parseInt(hours), parseInt(minutes));
        
        // 如果没有结束日期，默认设置持续时间为2小时
        if (!performance.endDate) {
            event.end = new Date(event.start);
            event.end.setHours(event.start.getHours() + 2);
        }
    }

    // 生成iCalendar格式字符串
    const icsEvent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//FuturePixel//ChaoShan Cultural Events//CN',
        'BEGIN:VEVENT',
        `DTSTART:${formatDate(event.start)}`,
        `DTEND:${formatDate(event.end)}`,
        `SUMMARY:${event.summary}`,
        `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
        `LOCATION:${event.location}`,
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    return icsEvent;
}

// 格式化日期为iCalendar要求的格式
function formatDate(date) {
    return date.toISOString()
        .replace(/[-:]/g, '')
        .replace(/\.\d{3}/, '');
}

// 导出演出信息到系统日历
function exportToCalendar(performance) {
    // 获取当前域名和端口
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port;
    
    // 构建webcal URL
    // 将http://或https://替换为webcal://
    const baseUrl = `${protocol}//${hostname}${port ? ':' + port : ''}`;
    const calendarUrl = baseUrl + `/calendar/${performance.id}`;
    const webcalUrl = calendarUrl.replace(/^http(s)?:/, 'webcal:');
    
    // 打开系统日历
    window.location.href = webcalUrl;
}

// 导出函数供全局使用
window.exportToCalendar = exportToCalendar;
