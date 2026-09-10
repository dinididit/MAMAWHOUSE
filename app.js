(() => {
  'use strict';
  const data = window.CAMPAIGN;
  if (!data) return;

  const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const goalEl = document.getElementById('goal-amount');
  const storyEl = document.getElementById('story-body');
  const statusEl = document.getElementById('share-status');
  const previewEl = document.getElementById('share-message-preview');

  if (goalEl) goalEl.textContent = money.format(data.goal);
  if (storyEl) storyEl.textContent = data.story.body;
  if (previewEl && data.share?.message) previewEl.textContent = data.share.message;

  document.querySelectorAll('[data-donate]').forEach((link) => {
    link.href = data.donateUrl;
  });

  // Share the public campaign hub. Donation actions remain a separate direct
  // handoff to the official GoFundMe.
  const shareUrl = () => data.share?.url || data.donateUrl;
  const messageWithLink = () => `${data.share.message}\n\n${shareUrl()}`;

  function setStatus(message) {
    if (statusEl) statusEl.textContent = message;
  }

  function legacyCopy(text) {
    const box = document.createElement('textarea');
    box.value = text;
    box.setAttribute('readonly', '');
    box.style.position = 'fixed';
    box.style.opacity = '0';
    box.style.pointerEvents = 'none';
    document.body.appendChild(box);
    box.focus();
    box.select();
    box.setSelectionRange(0, box.value.length);
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (_) { ok = false; }
    box.remove();
    return ok;
  }

  async function writeClipboard(text, successMessage) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        setStatus(successMessage);
        return true;
      } catch (_) {
        // Fall through to the local-preview-safe copy method.
      }
    }
    if (legacyCopy(text)) {
      setStatus(successMessage);
      return true;
    }
    setStatus('Copying is blocked by this browser. Use Text, Email, or Facebook instead.');
    return false;
  }

  const smsHref = () => `sms:?body=${encodeURIComponent(messageWithLink())}`;
  const emailHref = () => `mailto:?subject=${encodeURIComponent("Mamaw's House — $1 Volunteer Challenge")}&body=${encodeURIComponent(messageWithLink())}`;

  async function share() {
    // Prefer the phone/browser native share sheet on HTTPS. If unavailable,
    // fall back to an app link instead of leaving the control inert.
    if (navigator.share && window.isSecureContext) {
      try {
        await navigator.share({ title: data.title, text: data.share.message, url: shareUrl() });
        setStatus('Thank you for carrying Mamaw\'s House one person farther.');
        return;
      } catch (err) {
        if (err && err.name === 'AbortError') return;
      }
    }

    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent || '')) {
      setStatus('Opening your text app with the Mamaw\'s House message ready.');
      window.location.href = smsHref();
      return;
    }

    setStatus('Opening an email with the Mamaw\'s House message ready.');
    window.location.href = emailHref();
  }

  ['share-main', 'share-volunteer', 'share-final', 'share-recognition', 'share-mobile'].forEach((id) => {
    document.getElementById(id)?.addEventListener('click', (event) => {
      event.preventDefault();
      share();
    });
  });

  document.getElementById('copy-link')?.addEventListener('click', () => {
    writeClipboard(shareUrl(), 'Official campaign link copied.');
  });

  document.getElementById('copy-message')?.addEventListener('click', () => {
    writeClipboard(messageWithLink(), 'Ready-made post and official campaign link copied.');
  });

  const sms = document.getElementById('sms-share');
  if (sms) sms.href = smsHref();

  const facebook = document.getElementById('facebook-share');
  if (facebook) facebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl())}`;

  const email = document.getElementById('email-share');
  if (email) email.href = emailHref();
})();
