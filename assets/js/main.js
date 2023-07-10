const app = {
    profileSettings: {
    },

    createStorage(key = '') {
        const store = JSON.parse(localStorage.getItem(key)) ?? {};

        function save() {
            localStorage.setItem(key, JSON.stringify(store));
        }

        return {
            getStore() {
                return store;
            },
            setStore(newStore) {
                if (newStore) {
                    store = newStore;
                }
                save();
            },
            get(key) {
                return store[key];
            },
            set(key, value) {
                store[key] = value;
                save();
            },
            remove(key) {
                delete store[key];
                save();
            },
            clear() {
                store = {};
                save();
            }
        }
    },

    getBirthday(dateBirth = '01/01/1970') {
        let arrayDateBirth = dateBirth.trim().split('/'),
            dayBirth = String(arrayDateBirth[0]).padStart(2, '0'),
            monthBirth = String(arrayDateBirth[1]).padStart(2, '0'),
            monthDayBirth = `${monthBirth}/${dayBirth}`;

        let today = new Date(),
            dayToday = String(today.getDay()).padStart(2, '0'),
            monthToday = String(today.getMonth() + 1).padStart(2, '0');
            yearToday = today.getFullYear();
            nextYearToday = yearToday + 1;
        
        today = `${monthToday}-${dayToday}-${yearToday}`;
        let birthday = `${monthDayBirth}-${yearToday}`;

        if (today > birthday) {
            birthday = `${monthDayBirth}-${nextYearToday}`;
        }

        return birthday;
    },

    countdown(dateBirth = '01/01/1970') {
        const SECOND_UNIT = 1000,
            MINUTE_UNIT = SECOND_UNIT * 60,
            HOUR_UNIT = MINUTE_UNIT * 60,
            DAY_UNIT = HOUR_UNIT * 24;

        const BIRTHDAY = this.getBirthday(dateBirth),
            MILIS_BIRTHDAY = new Date(BIRTHDAY).getTime();

        setInterval(() => {
            const MILIS_NOW = new Date().getTime();
            const DISTANCE = MILIS_BIRTHDAY - MILIS_NOW;
            
            const countdownDaysElement = document.querySelector('.countdown__days'),
                countdownHoursElement = document.querySelector('.countdown__hours'),
                countdownMinutesElement = document.querySelector('.countdown__minutes'),
                countdownSecondsElement = document.querySelector('.countdown__seconds');

            countdownDaysElement.innerText = Math.floor(DISTANCE / DAY_UNIT);
            countdownHoursElement.innerText = Math.floor(DISTANCE % DAY_UNIT / HOUR_UNIT);
            countdownMinutesElement.innerText = Math.floor(DISTANCE % HOUR_UNIT / MINUTE_UNIT);
            countdownSecondsElement.innerText = Math.floor(DISTANCE % MINUTE_UNIT / SECOND_UNIT);

        }, 0);
    },

    start() {
        const storage = this.createStorage('profileSettings');
        this.profileSettings = storage.getStore();

        if (this?.profileSettings?.dateBirth) {
            this.countdown(this.profileSettings.dateBirth);
        } else {
            this.profileSettings.dateBirth = prompt('Your Date Of Birth');
            storage.set('dateBirth', this.profileSettings.dateBirth);
            this.countdown(this.profileSettings.dateBirth);
        }   
    }
}

app.start();