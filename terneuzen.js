document.addEventListener('DOMContentLoaded', function() {
  const xhr = new XMLHttpRequest();
  const datePicker = document.getElementById('datepicker');
  datePicker.addEventListener('input', function() {
    xhr.open('GET', `https://raw.githubusercontent.com/mcrombeen/Getijden3/main/hwlw-TERNZN-20230101-20231231.xml`);
    xhr.onload = function() {
      if (xhr.status === 200) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xhr.responseText, "application/xml");

        const selectedDate = new Date(datePicker.value);
        const currentDate = selectedDate.toLocaleDateString('nl-NL', {month: 'long'});
        const currentDay = selectedDate.toLocaleDateString('nl-NL', {weekday: 'long'});

        const dateElement = document.getElementById('date');
        dateElement.textContent = currentDay + ' ' + currentDate;

        const dataElement = document.getElementById('data');
        dataElement.innerHTML = '';

        const dateStr = selectedDate.toISOString().slice(0, 8) + '01'; // Get the year and month of the selected date
        const values = xmlDoc.getElementsByTagName('value');

        for (let i = 0; i < values.length; i++) {
          const datetime = values[i].getElementsByTagName('datetime')[0].textContent;
          const tide = values[i].getElementsByTagName('tide')[0].textContent;
          const val = values[i].getElementsByTagName('val')[0].textContent;
						          if (datetime.startsWith(dateStr)) {
            let key;
            let value = parseFloat(val) / 100;

            if (tide === 'HW') {
              key = i % 2 === 0 ? 'Eerste Hoogwater ' : 'Tweede Hoogwater ';
            } else if (tide === 'LW') {
              key = i % 2 === 0 ? 'Eerste Laagwater ' : 'Tweede Laagwater ';
            }

            value = value.toFixed(2) + ' mtr';

            const listItem = document.createElement('li');
            listItem.textContent = `${key}: ${value}`;
            dataElement.appendChild(listItem);
            dataElement.appendChild(document.createElement('br'));
          }
        }
      } else {
        console.error('Failed to load data from the XML file');
      }
    };
    xhr.send();
  });

  // Set default date to current date
  const today = new Date();
  const todayStr = today.toISOString().substr(0, 10);
  datePicker.value = todayStr;

  // Trigger input event for default date
  const event = new Event('input');
  event.simulated = true;
  datePicker.dispatchEvent(event);
});

