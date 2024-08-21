document.addEventListener('DOMContentLoaded', function() {
    // Function to set the date for a given form element
    function setDate(formIndex, daysBeforeToday) {
        const forms = document.querySelectorAll('.checklist-form');
        const dateInput = forms[formIndex].querySelector('input[type="date"]');
        const today = new Date();
        today.setDate(today.getDate() - daysBeforeToday);
        const formattedDate = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
        dateInput.value = formattedDate;
    }

    // Set dates for the forms
    setDate(0, 2); // Form 1: 2 days before today
    setDate(1, 1); // Form 2: 1 day before today
    setDate(2, 0); // Form 3: Today

    const forms = document.querySelectorAll('.checklist-form');
    const ctx = document.getElementById('checklist-chart').getContext('2d');

    // Initialize Chart.js
    // Initialize Chart.js
const chart = new Chart(ctx, {
    type: 'bar', // Base chart type
    data: {
        labels: [], // Dates will be added here
        datasets: [
            {
                label: 'Progress (%)',
                data: [], // Progress percentages will be added here
                backgroundColor: '#593d3b42',
                borderColor: '#593d3b',
                borderWidth: 1,
                stack: 'Stack 0'
            },
            {
                label: 'Mood',
                data: [], // Mood values will be added here
                type: 'line',
                borderColor: '#f44336',
                borderWidth: 2,
                fill: false,
                yAxisID: 'mood-axis',
                stack: false
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false, // Allow canvas height to be controlled by CSS
        plugins: {
            legend: {
                labels: {
                    // color: 'white', // Change legend text color to white
                    font: {
                        size: 16 // Increase legend font size
                    }
                }
            },
            tooltip: {
                // titleColor: 'white', // Change tooltip title color to white
                // bodyColor: 'white', // Change tooltip body color to white
                titleFont: {
                    size: 14 // Increase tooltip title font size
                },
                bodyFont: {
                    size: 12 // Increase tooltip body font size
                }
            }
        },
        scales: {
            x: {
                stacked: true,
                grid: {
                    // color: 'rgba(255, 255, 255, 0.3)', // More bold grid lines color
                    // borderColor: 'white', // Make grid line borders white
                    borderWidth: 2 // Increase border width for boldness
                },
                title: {
                    display: true,
                    text: 'Date',
                    // color: 'white', // Change x-axis title color to white
                    font: {
                        size: 18 // Increase x-axis title font size
                    }
                },
                ticks: {
                    // color: 'white', // Change x-axis ticks color to white
                    font: {
                        size: 14 // Increase x-axis ticks font size
                    }
                }
            },
            y: {
                stacked: true,
                beginAtZero: true,
                max: 100,
                grid: {
                    // color: 'rgba(255, 255, 255, 0.3)', // More bold grid lines color
                    // borderColor: 'white', // Make grid line borders white
                    borderWidth: 2 // Increase border width for boldness
                },
                title: {
                    display: true,
                    text: 'Progress (%)',
                    // color: 'white', // Change y-axis title color to white
                    font: {
                        size: 18 // Increase y-axis title font size
                    },
                    // Use callback function to hide the title based on window width
                    display: window.innerWidth > 400
                },
                ticks: {
                    // color: 'white', // Change y-axis ticks color to white
                    font: {
                        size: 14 // Increase y-axis ticks font size
                    }
                }
            },
            'mood-axis': {
                type: 'linear',
                position: 'right',
                beginAtZero: true,
                max: 5, // Adjusted max value for mood (1-5)
                grid: {
                    // color: 'rgba(255, 255, 255, 0.3)', // More bold grid lines color
                    // borderColor: 'white', // Make grid line borders white
                    borderWidth: 2 // Increase border width for boldness
                },
                title: {
                    display: true,
                    text: 'Mood (1-5)',
                    // color: 'white', // Change mood-axis title color to white
                    font: {
                        size: 18 // Increase mood-axis title font size
                    }
                },
                ticks: {
                    // color: 'white', // Change mood-axis ticks color to white
                    font: {
                        size: 14 // Increase mood-axis ticks font size
                    },
                    display: window.innerWidth > 400 // Hide ticks if width <= 400px
                },
                display: window.innerWidth > 400 // Hide axis if width <= 400px
            }
        },
        // Resize handler to dynamically adjust axis visibility and font size
        onResize: (chart, size) => {
            // Adjust y-axis title display based on window width
            chart.options.scales.y.title.display = size.width > 400;

            // Adjust mood-axis visibility based on window width
            chart.options.scales['mood-axis'].display = size.width > 400;

            // Adjust font sizes based on window width
            const fontSize = size.width <= 625 ? 10 : 14;
            chart.options.scales.x.ticks.font.size = fontSize;
            chart.options.scales.y.ticks.font.size = fontSize;
            chart.options.scales['mood-axis'].ticks.font.size = fontSize;

            // Adjust legend font size based on window width
            chart.options.plugins.legend.labels.font.size = size.width <= 400 ? 12 : 16;

            chart.options.scales.x.title.font.size = size.width <= 400 ? 12 : 16;
            // Update the chart with the new settings
            chart.update();
        }
    }
});



    forms.forEach((form, index) => {
        const addButton = form.querySelector('.add-task');
        const newTaskInput = form.querySelector('.new-task');
        const checklistItems = form.querySelector('.checklist-items');
        const progressBar = form.querySelector('.progress');
        const progressText = form.querySelector('.progress-text');
        const dateInput = form.querySelector('input[type="date"]');

        const showAddTaskButton = form.querySelector('.show-add-task');
        const addTaskContainer = form.querySelector('.add-task-container');

        showAddTaskButton.addEventListener('click', () => {
            addTaskContainer.style.display = addTaskContainer.style.display === 'none' ? 'block' : 'none';
        });

        document.querySelectorAll('.calendar-button').forEach(button => {
            button.addEventListener('click', function() {
                const calendarContainer = this.nextElementSibling; // The calendar-container element
                calendarContainer.style.display = calendarContainer.style.display === 'none' ? 'block' : 'none';
            });
        });        

        addButton.addEventListener('click', () => {
            const taskText = newTaskInput.value.trim();
            if (taskText !== '') {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <div class="new-box">
                        <div><input type="checkbox" class="checkbox"> ${taskText} </div>
                        <button class="remove-task">Remove</button>
                    </div>`;
                checklistItems.appendChild(listItem);
                newTaskInput.value = '';

                // Update progress
                updateProgress();
            }
        });

        // Event delegation for removing tasks
        checklistItems.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-task')) {
                event.target.closest('li').remove();
                updateProgress();
            }
        });


        checklistItems.addEventListener('change', () => {
            updateProgress();
        });

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const date = dateInput.value;
            const progressPercentage = updateProgress();
            const moodName = index === 0 ? 'mood1' : (index === 1 ? 'mood2' : 'mood3'); // Set moodName based on form index
            const moodValue = getMoodValue(form, moodName);

            if (date) {
                // Check if the date already exists in the chart
                const dateIndex = chart.data.labels.indexOf(date);
                if (dateIndex !== -1) {
                    // Update the existing data point
                    chart.data.datasets[0].data[dateIndex] = progressPercentage;
                    chart.data.datasets[1].data[dateIndex] = moodValue;
                } else {
                    // Add new date and progress percentage
                    chart.data.labels.push(date);
                    chart.data.datasets[0].data.push(progressPercentage);
                    chart.data.datasets[1].data.push(moodValue);
                }

                // Sort the dates and corresponding data
                sortChartData(chart);
            }
        });

        function updateProgress() {
            const totalItems = checklistItems.querySelectorAll('li').length;
            const checkedItems = checklistItems.querySelectorAll('input:checked').length;
            const progressPercentage = totalItems > 0 ? (checkedItems / totalItems) * 100 : 0;
            progressBar.style.width = `${progressPercentage}%`;
            progressText.innerHTML = `<strong>${Math.round(progressPercentage)}%</strong>`;
            return Math.round(progressPercentage);
        }

        function getMoodValue(form, moodName) {
            const moodInput = form.querySelector(`input[name="${moodName}"]:checked`);
            if (moodInput) {
                return parseInt(moodInput.value);
            }
            return 3; // Default value if no mood is selected
        }        
        

        function sortChartData(chart) {
            // Combine labels (dates) and data into an array of objects
            const chartData = chart.data.labels.map((label, index) => {
                return {
                    date: label,
                    progress: chart.data.datasets[0].data[index],
                    mood: chart.data.datasets[1].data[index]
                };
            });

            // Sort the array by date
            chartData.sort((a, b) => new Date(a.date) - new Date(b.date));

            // Separate the sorted data back into labels and data
            chart.data.labels = chartData.map(item => item.date);
            chart.data.datasets[0].data = chartData.map(item => item.progress);
            chart.data.datasets[1].data = chartData.map(item => item.mood);

            // Update the chart with the sorted data
            chart.update();
        }
    });
});


/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    toggle.addEventListener('click', () =>{
        // Add show-menu class to nav menu
        nav.classList.toggle('show-menu')
        // Add show-icon to show and hide menu icon
        toggle.classList.toggle('show-icon')
    })
}

showMenu('nav-toggle','nav-menu')

/*=============== SHOW DROPDOWN MENU ===============*/
const dropdownItems = document.querySelectorAll('.dropdown__item')

// 1. Select each dropdown item
dropdownItems.forEach((item) =>{
    const dropdownButton = item.querySelector('.dropdown__button') 

    // 2. Select each button click
    dropdownButton.addEventListener('click', () =>{
        // 7. Select the current show-dropdown class
        const showDropdown = document.querySelector('.show-dropdown')
        
        // 5. Call the toggleItem function
        toggleItem(item)

        // 8. Remove the show-dropdown class from other items
        if(showDropdown && showDropdown!== item){
            toggleItem(showDropdown)
        }
    })
})

// 3. Create a function to display the dropdown
const toggleItem = (item) =>{
    // 3.1. Select each dropdown content
    const dropdownContainer = item.querySelector('.dropdown__container')

    // 6. If the same item contains the show-dropdown class, remove
    if(item.classList.contains('show-dropdown')){
        dropdownContainer.removeAttribute('style')
        item.classList.remove('show-dropdown')
    } else{
        // 4. Add the maximum height to the dropdown content and add the show-dropdown class
        dropdownContainer.style.height = dropdownContainer.scrollHeight + 'px'
        item.classList.add('show-dropdown')
    }
}

/*=============== DELETE DROPDOWN STYLES ===============*/
const mediaQuery = matchMedia('(min-width: 1118px)'),
    dropdownContainer = document.querySelectorAll('.dropdown__container')

// Function to remove dropdown styles in mobile mode when browser resizes
const removeStyle = () =>{
    // Validate if the media query reaches 1118px
    if(mediaQuery.matches){
        // Remove the dropdown container height style
        dropdownContainer.forEach((e) =>{
            e.removeAttribute('style')
        })

        // Remove the show-dropdown class from dropdown item
        dropdownItems.forEach((e) =>{
            e.classList.remove('show-dropdown')
        })
    }
}

addEventListener('resize', removeStyle)
