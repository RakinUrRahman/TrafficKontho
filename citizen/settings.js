// Wait for DOM ready
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("settingsForm");
    const saveMessage = document.getElementById("saveMessage");
  
    // Load saved settings if any
    const savedSettings = JSON.parse(localStorage.getItem("trafficKonthoSettings")) || {};
    if (savedSettings.notifPref) form.notifPref.value = savedSettings.notifPref;
    if (savedSettings.themeSelect) form.themeSelect.value = savedSettings.themeSelect;
    if (savedSettings.autoUpdates) form.autoUpdates.checked = savedSettings.autoUpdates;
    if (savedSettings.privacyMode) form.privacyMode.checked = savedSettings.privacyMode;
  
    // Save on submit
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const settings = {
        notifPref: form.notifPref.value,
        themeSelect: form.themeSelect.value,
        autoUpdates: form.autoUpdates.checked,
        privacyMode: form.privacyMode.checked,
      };
  
      localStorage.setItem("trafficKonthoSettings", JSON.stringify(settings));
  
      // Show success message briefly
      saveMessage.style.display = "block";
      setTimeout(() => {
        saveMessage.style.display = "none";
      }, 3000);
    });
  });
  const settingsForm = document.getElementById('settingsForm');
const saveMessage = document.getElementById('saveMessage');

settingsForm.addEventListener('submit', e => {
  e.preventDefault();

  // Simulate saving settings (you can replace with real API calls)
  saveMessage.textContent = "Saving settings...";
  setTimeout(() => {
    saveMessage.textContent = "Settings saved successfully!";
  }, 1200);
});
