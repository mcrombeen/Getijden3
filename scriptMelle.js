 document.addEventListener('DOMContentLoaded', function() {
  const xhr = new XMLHttpRequest();
  const datePicker = document.getElementById('datepicker');
  datePicker.addEventListener('input', function() {
    xhr.open('GET', `https://raw.githubusercontent.com/mcrombeen/Getijden3/main/melle23TAW.json`);
    xhr.onload = function() {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        const selectedDate = new Date(datePicker.value);
        const currentDate = selectedDate.toLocaleDateString({month: 'long'});
        const currentDay = selectedDate.toLocaleDateString('nl-NL', {weekday: 'long'});
        const currentData = data.find(obj => {
          const dateStr = obj.Date;
          const [day, month, year] = dateStr.split('/');
          const date = new Date(`${year}-${month}-${day}`);
          return date.getTime() === selectedDate.getTime();
        });
        const dateElement = document.getElementById('date');
        dateElement.textContent = currentDay + (' ') + currentDate;
        const dataElement = document.getElementById('data');
        dataElement.innerHTML = '';
        Object.keys(currentData).forEach(key => {
          if (key !== 'Date') {
            let value = currentData[key];
            if (key === 'HW1') {
              key = 'Eerste Hoogwater :';
              value += ' hr';
            }
            else if (key === 'HW2') {
              key = 'Tweede Hoogwater :';
              value += ' hr';
            }
            else if (key === 'LW1') {
              key = 'Eerste Laagwater :';
              value += ' hr';
            }
            else if (key === 'LW2') {
              key = 'Tweede Laagwater :';
              value += ' hr';
            }
            else if (key === 'm TAW') {
              key = 'HW 1 : ';
              value += ' mtr TAW';
            }
            else if (key === 'm TAW__1') {
              key = 'LW 1 : ';
              value += ' mtr TAW';
            }
            else if (key === 'm TAW__2') {
              key = 'HW 2 : ';
              value += ' mtr TAW';
            }
            else if (key === 'm TAW__3') {
              key = 'LW 2 : ';
              value += ' mtr TAW';
            }
            const listItem = document.createElement('li');
            listItem.textContent = `${key} ${value}`;
            dataElement.appendChild(listItem);
            dataElement.appendChild(document.createElement('br'));
          }
        });
      } else {
        console.error('Failed to load data from wintam23TAW.json');
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







  


    











