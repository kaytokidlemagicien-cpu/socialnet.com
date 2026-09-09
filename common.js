// تحديد رابط السيرفر المباشر على الإنترنت بدلاً من localhost
const LIVE_SERVER_URL = "https://your-backend-domain.com"; // ضع رابط سيرفرك هنا

// الدالة الموحدة للحصول على رابط API
function getApiUrl() {
  // إذا كان التطبيق يعمل داخل Capacitor (APK أندرويد)
  if (window.Capacitor && window.Capacitor.isNativePlatform()) {
    return LIVE_SERVER_URL;
  }
  // إذا كان يختبر محلياً في المحاكي
  if (window.location.protocol === 'file:') {
    return LIVE_SERVER_URL;
  }
  // إذا كان يعمل على المتصفح العادي
  return window.location.origin;
}

const API_BASE_URL = getApiUrl();
