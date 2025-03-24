const navbar = document.getElementById("navbar")
const open = document.getElementById("open");
const close = document.getElementById("close");

open.addEventListener("click", () => {
  navbar.setAttribute('data-visible', "true");
})

close.addEventListener("click", () => {
  navbar.setAttribute('data-visible', "false");
})

/* Handle tab groups */
document.querySelectorAll('.tab-group').forEach(group => {
  const tabs = group.querySelectorAll('[role="tab"]');
  const panels = group.querySelectorAll('.tab-panel');

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
      panels.forEach(a => a.classList.add('hidden'));

      tab.setAttribute('aria-selected', 'true');
      panels[i].classList.remove('hidden');
      tabs[i].classList.add('tab-border')

      tabs.forEach((tab) => {
        if (tab.getAttribute('aria-selected') === 'true') {
          tab.classList.add('tab-selected');
        } else {
          tab.classList.remove('tab-selected');
        }
      })
    });
  });

});

