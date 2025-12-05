// ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ =====
let currentUser = null;
let currentScreen = 'profile-setup';
let currentWorkout = null;
let waterIntake = 0;
let diaryWorkouts = [];
let dailyActivity = {
    minutes: 0,
    calories: 0
};
let workoutTimer = null;
let workoutTimeLeft = 0;
let currentExerciseIndex = 0;
let isResting = false;
let currentSet = 1;
let totalSets = 1;

// ===== ТРЕНИРОВКИ С ОТДЫХОМ И ТАЙМЕРОМ (32 ТРЕНИРОВКИ) =====
const homeWorkouts = [
    {
        id: 'home1',
        name: '🏠 Утренняя зарядка',
        description: 'Легкая разминка на всё тело для пробуждения',
        type: 'home',
        duration: 15,
        calories: 100,
        difficulty: 'легко',
        exercises: [
            { name: 'Наклоны головы', duration: 120, rest: 15, sets: 1 },
            { name: 'Вращения плечами', duration: 120, rest: 15, sets: 1 },
            { name: 'Наклоны корпуса', duration: 180, rest: 20, sets: 1 },
            { name: 'Приседания', duration: 240, rest: 30, sets: 1 },
            { name: 'Растяжка', duration: 240, rest: 0, sets: 1 }
        ]
    },
    {
        id: 'home2',
        name: '💪 Тренировка с весом тела',
        description: 'Без оборудования, максимум эффективности',
        type: 'home',
        duration: 30,
        calories: 250,
        difficulty: 'средне',
        exercises: [
            { name: 'Отжимания', duration: 45, rest: 30, sets: 3, reps: 15 },
            { name: 'Приседания', duration: 45, rest: 30, sets: 3, reps: 20 },
            { name: 'Планка', duration: 60, rest: 30, sets: 3 },
            { name: 'Выпады', duration: 45, rest: 30, sets: 3, reps: 12 },
            { name: 'Скручивания', duration: 45, rest: 30, sets: 3, reps: 20 },
            { name: 'Отдых между кругами', duration: 60, rest: 0, sets: 1 }
        ]
    },
    {
        id: 'home3',
        name: '🧘‍♀️ Йога для начинающих',
        description: 'Расслабление, растяжка и укрепление тела',
        type: 'home',
        duration: 25,
        calories: 150,
        difficulty: 'легко',
        exercises: [
            { name: 'Поза горы (Тадасана)', duration: 300, rest: 10, sets: 1 },
            { name: 'Поза дерева (Врикшасана)', duration: 300, rest: 10, sets: 1 },
            { name: 'Поза воина (Вирабхадрасана)', duration: 300, rest: 10, sets: 1 },
            { name: 'Отдых', duration: 120, rest: 0, sets: 1 },
            { name: 'Поза ребенка (Баласана)', duration: 300, rest: 10, sets: 1 },
            { name: 'Шавасана', duration: 300, rest: 0, sets: 1 }
        ]
    },
    {
        id: 'home4',
        name: '🔥 HIIT тренировка',
        description: 'Интервальная тренировка высокой интенсивности',
        type: 'home',
        duration: 20,
        calories: 300,
        difficulty: 'тяжело',
        exercises: [
            { name: 'Берпи', duration: 45, rest: 15, sets: 4 },
            { name: 'Прыжки на месте', duration: 45, rest: 15, sets: 4 },
            { name: 'Скручивания', duration: 45, rest: 15, sets: 4 },
            { name: 'Отдых', duration: 60, rest: 0, sets: 1 },
            { name: 'Альпинист', duration: 45, rest: 15, sets: 4 }
        ]
    },
    {
        id: 'home5',
        name: '🦵 Тренировка ног',
        description: 'Укрепление ног и ягодиц без оборудования',
        type: 'home',
        duration: 35,
        calories: 280,
        difficulty: 'средне',
        exercises: [
            { name: 'Приседания с прыжком', duration: 45, rest: 45, sets: 4, reps: 15 },
            { name: 'Выпады назад', duration: 60, rest: 45, sets: 3, reps: 12 },
            { name: 'Подъем на носки', duration: 30, rest: 30, sets: 4, reps: 20 },
            { name: 'Отдых', duration: 120, rest: 0, sets: 1 },
            { name: 'Ягодичный мостик', duration: 45, rest: 30, sets: 4, reps: 15 },
            { name: 'Боковые выпады', duration: 45, rest: 30, sets: 3, reps: 12 },
            { name: 'Растяжка', duration: 420, rest: 0, sets: 1 }
        ]
    },
    {
        id: 'home6',
        name: '💪 Тренировка на пресс',
        description: 'Укрепление мышц живота и кора',
        type: 'home',
        duration: 25,
        calories: 200,
        difficulty: 'средне',
        exercises: [
            { name: 'Скручивания', duration: 45, rest: 15, sets: 4, reps: 20 },
            { name: 'Подъем ног', duration: 45, rest: 15, sets: 4, reps: 15 },
            { name: 'Русские скручивания', duration: 45, rest: 15, sets: 3, reps: 20 },
            { name: 'Планка', duration: 60, rest: 30, sets: 3 },
            { name: 'Велосипед', duration: 60, rest: 20, sets: 3, reps: 30 },
            { name: 'Отдых', duration: 60, rest: 0, sets: 1 }
        ]
    },
    {
        id: 'home7',
        name: '🏋️‍♀️ Тренировка рук',
        description: 'Укрепление бицепсов и трицепсов дома',
        type: 'home',
        duration: 30,
        calories: 220,
        difficulty: 'средне',
        exercises: [
            { name: 'Отжимания от пола', duration: 60, rest: 30, sets: 4, reps: 15 },
            { name: 'Отжимания на трицепс', duration: 45, rest: 30, sets: 3, reps: 12 },
            { name: 'Подтягивания (с резиной)', duration: 60, rest: 45, sets: 3, reps: 10 },
            { name: 'Молотки с бутылками', duration: 45, rest: 30, sets: 3, reps: 15 },
            { name: 'Французский жим', duration: 45, rest: 30, sets: 3, reps: 12 },
            { name: 'Растяжка рук', duration: 180, rest: 0, sets: 1 }
        ]
    },
    {
        id: 'home8',
        name: '🧘 Стретчинг для гибкости',
        description: 'Улучшение гибкости и подвижности суставов',
        type: 'home',
        duration: 30,
        calories: 120,
        difficulty: 'легко',
        exercises: [
            { name: 'Растяжка шеи', duration: 120, rest: 10, sets: 1 },
            { name: 'Растяжка плеч', duration: 120, rest: 10, sets: 1 },
            { name: 'Наклоны вперед', duration: 180, rest: 15, sets: 1 },
            { name: 'Бабочка', duration: 180, rest: 15, sets: 1 },
            { name: 'Растяжка бедер', duration: 180, rest: 15, sets: 1 },
            { name: 'Поза голубя', duration: 180, rest: 15, sets: 1 },
            { name: 'Глубокое дыхание', duration: 180, rest: 0, sets: 1 }
        ]
    },
    {
        id: 'home9',
        name: '🏃‍♂️ Кардио дома',
        description: 'Интенсивная кардио тренировка без оборудования',
        type: 'home',
        duration: 35,
        calories: 350,
        difficulty: 'тяжело',
        exercises: [
            { name: 'Бег на месте', duration: 180, rest: 30, sets: 3 },
            { name: 'Прыжки с приседанием', duration: 60, rest: 30, sets: 4, reps: 15 },
            { name: 'Выпрыгивания', duration: 60, rest: 30, sets: 4, reps: 12 },
            { name: 'Альпинист', duration: 60, rest: 30, sets: 4 },
            { name: 'Берпи', duration: 60, rest: 45, sets: 4, reps: 10 },
            { name: 'Заминка', duration: 300, rest: 0, sets: 1 }
        ]
    },
    {
        id: 'home10',
        name: '🧍‍♂️ Осанка и спина',
        description: 'Укрепление мышц спины и улучшение осанки',
        type: 'home',
        duration: 25,
        calories: 180,
        difficulty: 'легко',
        exercises: [
            { name: 'Лодочка', duration: 45, rest: 30, sets: 3, reps: 12 },
            { name: 'Супермен', duration: 45, rest: 30, sets: 3, reps: 15 },
            { name: 'Птица-собака', duration: 60, rest: 30, sets: 3, reps: 10 },
            { name: 'Растяжка спины', duration: 180, rest: 20, sets: 1 },
            { name: 'Скручивания лежа', duration: 180, rest: 20, sets: 1 },
            { name: 'Глубокое дыхание', duration: 120, rest: 0, sets: 1 }
        ]
    },
    {
        id: 'home11',
        name: '💥 Взрывная сила',
        description: 'Развитие взрывной силы и мощности',
        type: 'home',
        duration: 30,
        calories: 320,
        difficulty: 'тяжело',
        exercises: [
            { name: 'Прыжки на тумбу (ступенька)', duration: 45, rest: 45, sets: 4, reps: 10 },
            { name: 'Берпи с прыжком', duration: 60, rest: 45, sets: 4, reps: 8 },
            { name: 'Плиометрические отжимания', duration: 45, rest: 45, sets: 3, reps: 8 },
            { name: 'Прыжки в длину на месте', duration: 30, rest: 30, sets: 4, reps: 12 },
            { name: 'Взрывные приседания', duration: 45, rest: 45, sets: 4, reps: 10 },
            { name: 'Растяжка', duration: 180, rest: 0, sets: 1 }
        ]
    },
    {
        id: 'home12',
        name: '🧘‍♂️ Медитация и релакс',
        description: 'Расслабление ума и тела, снятие стресса',
        type: 'home',
        duration: 20,
        calories: 80,
        difficulty: 'легко',
        exercises: [
            { name: 'Дыхание 4-7-8', duration: 300, rest: 10, sets: 1 },
            { name: 'Прогрессивная релаксация', duration: 300, rest: 10, sets: 1 },
            { name: 'Медитация осознанности', duration: 300, rest: 10, sets: 1 },
            { name: 'Визуализация', duration: 300, rest: 10, sets: 1 },
            { name: 'Глубокое расслабление', duration: 240, rest: 0, sets: 1 }
        ]
    },
    {
        id: 'home13',
        name: '🔄 Круговая тренировка',
        description: 'Полная круговая тренировка всего тела',
        type: 'home',
        duration: 40,
        calories: 380,
        difficulty: 'тяжело',
        exercises: [
            { name: 'Приседания', duration: 60, rest: 15, sets: 3, reps: 20 },
            { name: 'Отжимания', duration: 60, rest: 15, sets: 3, reps: 15 },
            { name: 'Планка', duration: 60, rest: 15, sets: 3 },
            { name: 'Выпады', duration: 60, rest: 15, sets: 3, reps: 12 },
            { name: 'Скручивания', duration: 60, rest: 15, sets: 3, reps: 20 },
            { name: 'Берпи', duration: 60, rest: 15, sets: 3, reps: 10 },
            { name: 'Отдых между кругами', duration: 120, rest: 0, sets: 1 }
        ]
    },
    {
        id: 'home14',
        name: '🦸‍♀️ Супергеройская тренировка',
        description: 'Интенсивная тренировка для всего тела',
        type: 'home',
        duration: 45,
        calories: 420,
        difficulty: 'тяжело',
        exercises: [
            { name: 'Супермен', duration: 45, rest: 30, sets: 4, reps: 12 },
            { name: 'Бэтмен (боковая планка)', duration: 45, rest: 30, sets: 3 },
            { name: 'Человек-паук (отжимания)', duration: 60, rest: 45, sets: 4, reps: 10 },
            { name: 'Железный человек (берпи)', duration: 60, rest: 45, sets: 4, reps: 8 },
            { name: 'Тор (молоты с гантелями)', duration: 45, rest: 30, sets: 3, reps: 15 },
            { name: 'Растяжка супергероя', duration: 240, rest: 0, sets: 1 }
        ]
    },
    {
        id: 'home15',
        name: '🌅 Утренний ритуал',
        description: 'Энергичная утренняя тренировка для бодрости',
        type: 'home',
        duration: 20,
        calories: 180,
        difficulty: 'легко',
        exercises: [
            { name: 'Потягивания', duration: 60, rest: 10, sets: 1 },
            { name: 'Вращения суставами', duration: 120, rest: 10, sets: 1 },
            { name: 'Динамическая растяжка', duration: 180, rest: 15, sets: 1 },
            { name: 'Бег на месте', duration: 180, rest: 20, sets: 1 },
            { name: 'Приседания', duration: 120, rest: 15, sets: 1, reps: 15 },
            { name: 'Отжимания', duration: 120, rest: 15, sets: 1, reps: 10 },
            { name: 'Завершающая растяжка', duration: 180, rest: 0, sets: 1 }
        ]
    }
];

const gymWorkouts = [
    {
        id: 'gym1',
        name: '🏋️‍♂️ Фулбади для начинающих',
        description: 'Базовая тренировка всего тела в зале',
        type: 'gym',
        duration: 60,
        calories: 400,
        difficulty: 'средне',
        exercises: [
            { name: 'Жим штанги лежа', duration: 180, rest: 60, sets: 4, reps: 10 },
            { name: 'Тяга верхнего блока', duration: 180, rest: 60, sets: 4, reps: 10 },
            { name: 'Приседания со штангой', duration: 240, rest: 90, sets: 4, reps: 10 },
            { name: 'Сгибания рук со штангой', duration: 150, rest: 45, sets: 3, reps: 12 },
            { name: 'Жим ногами', duration: 180, rest: 60, sets: 4, reps: 10 },
            { name: 'Гиперэкстензия', duration: 135, rest: 45, sets: 3, reps: 15 }
        ]
    },
    {
        id: 'gym2',
        name: '💪 Спина и бицепс',
        description: 'Проработка мышц спины и рук',
        type: 'gym',
        duration: 55,
        calories: 350,
        difficulty: 'средне',
        exercises: [
            { name: 'Становая тяга', duration: 240, rest: 90, sets: 4, reps: 8 },
            { name: 'Подтягивания', duration: 180, rest: 60, sets: 4 },
            { name: 'Тяга штанги в наклоне', duration: 180, rest: 60, sets: 4, reps: 10 },
            { name: 'Тяга гантели одной рукой', duration: 135, rest: 45, sets: 3, reps: 12 },
            { name: 'Отдых', duration: 120, rest: 0, sets: 1 },
            { name: 'Сгибания рук со штангой', duration: 180, rest: 45, sets: 4, reps: 10 },
            { name: 'Молотки с гантелями', duration: 135, rest: 45, sets: 3, reps: 12 }
        ]
    },
    {
        id: 'gym3',
        name: '🏋️‍♀️ Грудь и трицепс',
        description: 'Проработка грудных мышц и трицепсов',
        type: 'gym',
        duration: 50,
        calories: 320,
        difficulty: 'средне',
        exercises: [
            { name: 'Жим штанги лежа', duration: 180, rest: 60, sets: 4, reps: 10 },
            { name: 'Жим гантелей на наклонной', duration: 180, rest: 60, sets: 3, reps: 12 },
            { name: 'Разводка гантелей', duration: 150, rest: 45, sets: 3, reps: 15 },
            { name: 'Отжимания на брусьях', duration: 180, rest: 60, sets: 3, reps: 10 },
            { name: 'Французский жим', duration: 150, rest: 45, sets: 3, reps: 12 },
            { name: 'Разгибания на блоке', duration: 120, rest: 30, sets: 3, reps: 15 }
        ]
    },
    {
        id: 'gym4',
        name: '🦵 Ноги и ягодицы',
        description: 'Интенсивная тренировка нижней части тела',
        type: 'gym',
        duration: 65,
        calories: 450,
        difficulty: 'тяжело',
        exercises: [
            { name: 'Приседания со штангой', duration: 240, rest: 90, sets: 4, reps: 8 },
            { name: 'Жим ногами', duration: 180, rest: 60, sets: 4, reps: 10 },
            { name: 'Выпады с гантелями', duration: 150, rest: 45, sets: 3, reps: 12 },
            { name: 'Румынская тяга', duration: 180, rest: 60, sets: 3, reps: 10 },
            { name: 'Сгибания ног лежа', duration: 150, rest: 45, sets: 3, reps: 15 },
            { name: 'Разгибания ног', duration: 150, rest: 45, sets: 3, reps: 15 },
            { name: 'Подъем на носки', duration: 120, rest: 30, sets: 4, reps: 20 }
        ]
    },
    {
        id: 'gym5',
        name: '🏆 Силовая тренировка',
        description: 'Развитие максимальной силы',
        type: 'gym',
        duration: 70,
        calories: 380,
        difficulty: 'тяжело',
        exercises: [
            { name: 'Становая тяга', duration: 300, rest: 120, sets: 5, reps: 5 },
            { name: 'Приседания со штангой', duration: 300, rest: 120, sets: 5, reps: 5 },
            { name: 'Жим штанги лежа', duration: 240, rest: 90, sets: 5, reps: 5 },
            { name: 'Тяга штанги в наклоне', duration: 240, rest: 90, sets: 4, reps: 6 },
            { name: 'Армейский жим', duration: 180, rest: 60, sets: 4, reps: 8 },
            { name: 'Растяжка', duration: 300, rest: 0, sets: 1 }
        ]
    },
    {
        id: 'gym6',
        name: '🎯 Изолирующая тренировка',
        description: 'Проработка отдельных мышечных групп',
        type: 'gym',
        duration: 55,
        calories: 300,
        difficulty: 'средне',
        exercises: [
            { name: 'Сгибания рук с гантелями', duration: 150, rest: 45, sets: 3, reps: 12 },
            { name: 'Разгибания на блоке', duration: 150, rest: 45, sets: 3, reps: 15 },
            { name: 'Разводка гантелей', duration: 150, rest: 45, sets: 3, reps: 15 },
            { name: 'Сведения в тренажере', duration: 150, rest: 45, sets: 3, reps: 15 },
            { name: 'Разгибания ног', duration: 150, rest: 45, sets: 3, reps: 15 },
            { name: 'Сгибания ног', duration: 150, rest: 45, sets: 3, reps: 15 },
            { name: 'Подъем на носки', duration: 120, rest: 30, sets: 4, reps: 20 }
        ]
    },
    {
        id: 'gym7',
        name: '💥 Взрывная сила в зале',
        description: 'Развитие взрывной мощности с оборудованием',
        type: 'gym',
        duration: 50,
        calories: 400,
        difficulty: 'тяжело',
        exercises: [
            { name: 'Толкание мяча', duration: 60, rest: 60, sets: 4, reps: 8 },
            { name: 'Рывок гири', duration: 60, rest: 60, sets: 4, reps: 6 },
            { name: 'Прыжки на тумбу', duration: 45, rest: 45, sets: 4, reps: 10 },
            { name: 'Взрывные отжимания', duration: 45, rest: 45, sets: 3, reps: 8 },
            { name: 'Медицинбол скручивания', duration: 45, rest: 30, sets: 3, reps: 15 },
            { name: 'Растяжка', duration: 180, rest: 0, sets: 1 }
        ]
    },
    {
        id: 'gym8',
        name: '🔄 Круговая в зале',
        description: 'Интенсивная круговая тренировка в зале',
        type: 'gym',
        duration: 45,
        calories: 420,
        difficulty: 'тяжело',
        exercises: [
            { name: 'Гребля', duration: 60, rest: 30, sets: 3 },
            { name: 'Жим ногами', duration: 60, rest: 30, sets: 3, reps: 15 },
            { name: 'Тяга верхнего блока', duration: 60, rest: 30, sets: 3, reps: 12 },
            { name: 'Жим гантелей сидя', duration: 60, rest: 30, sets: 3, reps: 12 },
            { name: 'Сгибания ног', duration: 60, rest: 30, sets: 3, reps: 15 },
            { name: 'Скручивания', duration: 60, rest: 30, sets: 3, reps: 20 },
            { name: 'Отдых между кругами', duration: 120, rest: 0, sets: 1 }
        ]
    },
    {
        id: 'gym9',
        name: '🏃‍♂️ Кардио в зале',
        description: 'Комбинированная кардио тренировка',
        type: 'gym',
        duration: 40,
        calories: 350,
        difficulty: 'средне',
        exercises: [
            { name: 'Беговая дорожка', duration: 600, rest: 60, sets: 1 },
            { name: 'Велотренажер', duration: 300, rest: 60, sets: 1 },
            { name: 'Эллиптический тренажер', duration: 300, rest: 60, sets: 1 },
            { name: 'Степпер', duration: 300, rest: 60, sets: 1 },
            { name: 'Гребной тренажер', duration: 300, rest: 60, sets: 1 },
            { name: 'Заминка', duration: 300, rest: 0, sets: 1 }
        ]
    },
    {
        id: 'gym10',
        name: '🧘‍♂️ Растяжка в зале',
        description: 'Глубокая растяжка с использованием оборудования',
        type: 'gym',
        duration: 35,
        calories: 100,
        difficulty: 'легко',
        exercises: [
            { name: 'Растяжка с резиной', duration: 180, rest: 15, sets: 1 },
            { name: 'Растяжка на ролике', duration: 180, rest: 15, sets: 1 },
            { name: 'Глубокие выпады', duration: 180, rest: 15, sets: 1 },
            { name: 'Растяжка спины на скамье', duration: 180, rest: 15, sets: 1 },
            { name: 'Растяжка плеч с палкой', duration: 180, rest: 15, sets: 1 },
            { name: 'Финальное расслабление', duration: 240, rest: 0, sets: 1 }
        ]
    }
];

const cardioWorkouts = [
    {
        id: 'cardio1',
        name: '🏃‍♂️ Интервальный бег',
        description: 'Чередование быстрого и медленного темпа',
        type: 'cardio',
        duration: 30,
        calories: 350,
        difficulty: 'средне',
        exercises: [
            { name: 'Разминка - легкий бег', duration: 300, rest: 0, sets: 1 },
            { name: 'Спринт (90% усилий)', duration: 60, rest: 120, sets: 8 },
            { name: 'Заминка - ходьба', duration: 300, rest: 0, sets: 1 }
        ]
    },
    {
        id: 'cardio2',
        name: '🚴‍♀️ Велотренажер HIIT',
        description: 'Высокоинтенсивные интервалы на велосипеде',
        type: 'cardio',
        duration: 25,
        calories: 300,
        difficulty: 'тяжело',
        exercises: [
            { name: 'Разминка', duration: 300, rest: 0, sets: 1 },
            { name: 'Спринт (макс усилия)', duration: 30, rest: 90, sets: 10 },
            { name: 'Заминка', duration: 300, rest: 0, sets: 1 }
        ]
    },
    {
        id: 'cardio3',
        name: '🏊‍♂️ Кардио для сжигания жира',
        description: 'Эффективная жиросжигающая тренировка',
        type: 'cardio',
        duration: 45,
        calories: 500,
        difficulty: 'тяжело',
        exercises: [
            { name: 'Беговая дорожка', duration: 900, rest: 60, sets: 1 },
            { name: 'Велотренажер', duration: 600, rest: 60, sets: 1 },
            { name: 'Скакалка', duration: 300, rest: 60, sets: 1 },
            { name: 'Берпи', duration: 180, rest: 60, sets: 1, reps: 20 },
            { name: 'Заминка', duration: 300, rest: 0, sets: 1 }
        ]
    },
    {
        id: 'cardio4',
        name: '⛰️ Горная тренировка',
        description: 'Имитация бега в гору',
        type: 'cardio',
        duration: 40,
        calories: 450,
        difficulty: 'тяжело',
        exercises: [
            { name: 'Разминка', duration: 300, rest: 0, sets: 1 },
            { name: 'Бег в гору (10% наклон)', duration: 120, rest: 60, sets: 10 },
            { name: 'Бег по ровной', duration: 180, rest: 60, sets: 5 },
            { name: 'Спринт', duration: 30, rest: 90, sets: 5 },
            { name: 'Заминка', duration: 300, rest: 0, sets: 1 }
        ]
    },
    {
        id: 'cardio5',
        name: '🔄 Круговая кардио',
        description: 'Круговая тренировка на выносливость',
        type: 'cardio',
        duration: 35,
        calories: 380,
        difficulty: 'средне',
        exercises: [
            { name: 'Скакалка', duration: 60, rest: 30, sets: 4 },
            { name: 'Берпи', duration: 60, rest: 30, sets: 4 },
            { name: 'Альпинист', duration: 60, rest: 30, sets: 4 },
            { name: 'Прыжки на месте', duration: 60, rest: 30, sets: 4 },
            { name: 'Выпрыгивания', duration: 60, rest: 30, sets: 4 },
            { name: 'Отдых между кругами', duration: 120, rest: 0, sets: 1 }
        ]
    },
    {
        id: 'cardio6',
        name: '💨 Спринтерская тренировка',
        description: 'Развитие скорости и взрывной силы',
        type: 'cardio',
        duration: 25,
        calories: 320,
        difficulty: 'тяжело',
        exercises: [
            { name: 'Разминка', duration: 300, rest: 0, sets: 1 },
            { name: 'Спринт 100% усилий', duration: 20, rest: 40, sets: 10 },
            { name: 'Бег 80% усилий', duration: 60, rest: 60, sets: 5 },
            { name: 'Заминка', duration: 300, rest: 0, sets: 1 }
        ]
    },
    {
        id: 'cardio7',
        name: '🛶 Гребля HIIT',
        description: 'Интервальная тренировка на гребном тренажере',
        type: 'cardio',
        duration: 30,
        calories: 350,
        difficulty: 'тяжело',
        exercises: [
            { name: 'Разминка', duration: 300, rest: 0, sets: 1 },
            { name: 'Спринт на гребле', duration: 45, rest: 75, sets: 8 },
            { name: 'Средний темп', duration: 90, rest: 60, sets: 4 },
            { name: 'Заминка', duration: 300, rest: 0, sets: 1 }
        ]
    }
];

const restWorkouts = [
    {
        id: 'rest1',
        name: '🌿 Активный отдых',
        description: 'Легкая активность для восстановления',
        type: 'rest',
        duration: 45,
        calories: 150,
        difficulty: 'легко',
        exercises: [
            { name: 'Прогулка в парке', duration: 1800, rest: 0, sets: 1 },
            { name: 'Растяжка всего тела', duration: 600, rest: 0, sets: 1 },
            { name: 'Глубокое дыхание', duration: 300, rest: 0, sets: 1 }
        ]
    },
    {
        id: 'rest2',
        name: '🧘 Восстановительная йога',
        description: 'Восстановление мышц и снятие напряжения',
        type: 'rest',
        duration: 30,
        calories: 120,
        difficulty: 'легко',
        exercises: [
            { name: 'Детская поза', duration: 300, rest: 10, sets: 1 },
            { name: 'Поза кошки-коровы', duration: 300, rest: 10, sets: 1 },
            { name: 'Наклоны вперед', duration: 300, rest: 10, sets: 1 },
            { name: 'Поза голубя (каждая сторона)', duration: 300, rest: 10, sets: 2 },
            { name: 'Шавасана', duration: 600, rest: 0, sets: 1 }
        ]
    }
];

// ===== ПИТАНИЕ НА НЕДЕЛЮ (ПОЛНАЯ ВЕРСИЯ) =====
const weeklyMeals = {
    monday: {
        dayName: 'Понедельник',
        totalCalories: 1450,
        breakfast: {
            name: 'Овсяная каша с ягодами и орехами',
            calories: 350,
            description: '50г овсяных хлопьев, 200мл молока, 50г свежих ягод, 20г грецких орехов',
            time: '08:00',
            proteins: 15,
            fats: 12,
            carbs: 45
        },
        lunch: {
            name: 'Куриная грудка с гречкой и овощами',
            calories: 450,
            description: '150г куриной грудки, 100г гречки, 150г овощей (брокколи, морковь, цветная капуста)',
            time: '13:00',
            proteins: 40,
            fats: 8,
            carbs: 55
        },
        dinner: {
            name: 'Запеченная рыба с салатом',
            calories: 350,
            description: '200г трески, 200г салата (огурцы, помидоры, листья салата), 1 ч.л. оливкового масла',
            time: '19:00',
            proteins: 35,
            fats: 10,
            carbs: 15
        },
        snacks: [
            {
                name: 'Яблоко с миндалем',
                calories: 150,
                time: '11:00'
            },
            {
                name: 'Творог',
                calories: 150,
                time: '16:00'
            }
        ]
    },
    tuesday: {
        dayName: 'Вторник',
        totalCalories: 1480,
        breakfast: {
            name: 'Творожная запеканка с изюмом',
            calories: 320,
            description: '200г творога 5%, 1 яйцо, 30г изюма, корица по вкусу',
            time: '08:00',
            proteins: 30,
            fats: 10,
            carbs: 35
        },
        lunch: {
            name: 'Филе индейки с бурым рисом',
            calories: 420,
            description: '150г филе индейки, 100г бурого риса, 150г тушеных овощей',
            time: '13:00',
            proteins: 38,
            fats: 7,
            carbs: 50
        },
        dinner: {
            name: 'Омлет с овощами и зеленью',
            calories: 380,
            description: '3 яйца, 100г шпината, 50г болгарского перца, 50г помидоров',
            time: '19:00',
            proteins: 25,
            fats: 22,
            carbs: 12
        },
        snacks: [
            {
                name: 'Грейпфрут',
                calories: 100,
                time: '11:00'
            },
            {
                name: 'Протеиновый коктейль',
                calories: 160,
                time: '16:00'
            }
        ]
    },
    wednesday: {
        dayName: 'Среда',
        totalCalories: 1500,
        breakfast: {
            name: 'Смузи из банана и ягод',
            calories: 280,
            description: '1 банан, 100г ягод, 200мл молока, 1 ч.л. меда',
            time: '08:00',
            proteins: 10,
            fats: 5,
            carbs: 55
        },
        lunch: {
            name: 'Лосось с киноа',
            calories: 500,
            description: '150г лосося, 100г киноа, 150г овощей на пару',
            time: '13:00',
            proteins: 40,
            fats: 20,
            carbs: 45
        },
        dinner: {
            name: 'Куриные котлеты с салатом',
            calories: 400,
            description: '200г куриных котлет, 200г свежего салата',
            time: '19:00',
            proteins: 35,
            fats: 15,
            carbs: 20
        },
        snacks: [
            {
                name: 'Йогурт с орехами',
                calories: 180,
                time: '11:00'
            },
            {
                name: 'Апельсин',
                calories: 80,
                time: '16:00'
            }
        ]
    },
    thursday: {
        dayName: 'Четверг',
        totalCalories: 1520,
        breakfast: {
            name: 'Пшенная каша с тыквой',
            calories: 320,
            description: '60г пшена, 100г тыквы, 200мл молока, корица',
            time: '08:00',
            proteins: 12,
            fats: 8,
            carbs: 55
        },
        lunch: {
            name: 'Говядина с овощами',
            calories: 480,
            description: '150г говядины, 150г овощного рагу, 100г булгура',
            time: '13:00',
            proteins: 42,
            fats: 15,
            carbs: 50
        },
        dinner: {
            name: 'Салат с тунцом и яйцом',
            calories: 360,
            description: '1 банка тунца, 2 яйца, 150г овощей, листья салата',
            time: '19:00',
            proteins: 40,
            fats: 18,
            carbs: 10
        },
        snacks: [
            {
                name: 'Груша',
                calories: 120,
                time: '11:00'
            },
            {
                name: 'Кефир',
                calories: 140,
                time: '16:00'
            }
        ]
    },
    friday: {
        dayName: 'Пятница',
        totalCalories: 1550,
        breakfast: {
            name: 'Омлет с сыром и зеленью',
            calories: 350,
            description: '3 яйца, 30г сыра, помидоры, зелень',
            time: '08:00',
            proteins: 25,
            fats: 25,
            carbs: 8
        },
        lunch: {
            name: 'Куриный суп с овощами',
            calories: 420,
            description: '200г куриного бульона, 100г курицы, овощи, вермишель',
            time: '13:00',
            proteins: 35,
            fats: 12,
            carbs: 45
        },
        dinner: {
            name: 'Запеченные овощи с сыром',
            calories: 380,
            description: '300г овощей (кабачки, баклажаны, перец), 50г сыра',
            time: '19:00',
            proteins: 20,
            fats: 22,
            carbs: 35
        },
        snacks: [
            {
                name: 'Творожный сырок',
                calories: 150,
                time: '11:00'
            },
            {
                name: 'Банан',
                calories: 120,
                time: '16:00'
            },
            {
                name: 'Горький шоколад',
                calories: 130,
                time: '21:00'
            }
        ]
    },
    saturday: {
        dayName: 'Суббота',
        totalCalories: 1600,
        breakfast: {
            name: 'Блины из овсяной муки',
            calories: 380,
            description: '3 блина с медом и ягодами',
            time: '09:00',
            proteins: 15,
            fats: 10,
            carbs: 60
        },
        lunch: {
            name: 'Стейк из семги с овощами',
            calories: 520,
            description: '200г семги, 200г овощей гриль, лимон',
            time: '14:00',
            proteins: 45,
            fats: 30,
            carbs: 15
        },
        dinner: {
            name: 'Творожная запеканка',
            calories: 350,
            description: '250г творога, 2 яйца, 30г изюма',
            time: '19:30',
            proteins: 30,
            fats: 15,
            carbs: 25
        },
        snacks: [
            {
                name: 'Ореховая смесь',
                calories: 180,
                time: '11:00'
            },
            {
                name: 'Фруктовый салат',
                calories: 170,
                time: '17:00'
            }
        ]
    },
    sunday: {
        dayName: 'Воскресенье',
        totalCalories: 1580,
        breakfast: {
            name: 'Яичница с авокадо',
            calories: 400,
            description: '3 яйца, ½ авокадо, помидоры, цельнозерновой хлеб',
            time: '09:30',
            proteins: 22,
            fats: 30,
            carbs: 25
        },
        lunch: {
            name: 'Индейка с печеным картофелем',
            calories: 480,
            description: '150г индейки, 200г печеного картофеля, овощной салат',
            time: '14:00',
            proteins: 40,
            fats: 12,
            carbs: 55
        },
        dinner: {
            name: 'Легкий овощной суп',
            calories: 300,
            description: 'Овощной бульон, капуста, морковь, лук, зелень',
            time: '19:00',
            proteins: 15,
            fats: 8,
            carbs: 40
        },
        snacks: [
            {
                name: 'Йогурт с фруктами',
                calories: 200,
                time: '11:00'
            },
            {
                name: 'Творог с медом',
                calories: 200,
                time: '17:00'
            }
        ]
    }
};

// ===== РЕЦЕПТЫ (ПОЛНАЯ ВЕРСИЯ) =====
const recipes = [
    {
        id: 'recipe1',
        name: 'Протеиновые оладьи',
        category: 'завтрак',
        calories: 280,
        time: 20,
        difficulty: 'легко',
        ingredients: [
            '100г творога 5%',
            '2 яйца',
            '30г овсяных хлопьев',
            '½ банана',
            '1 ч.л. разрыхлителя',
            'Корица по вкусу'
        ],
        instructions: [
            'Смешать все ингредиенты в блендере до однородной массы',
            'Дать тесту постоять 5 минут',
            'Выпекать на антипригарной сковороде без масла',
            'Подавать с ягодами или медом'
        ],
        nutrition: {
            proteins: 25,
            fats: 10,
            carbs: 20
        }
    },
    {
        id: 'recipe2',
        name: 'Куриные котлеты в духовке',
        category: 'обед',
        calories: 180,
        time: 40,
        difficulty: 'средне',
        ingredients: [
            '500г куриного фарша',
            '1 луковица',
            '1 яйцо',
            '50г овсяных хлопьев',
            'Соль, перец, специи по вкусу',
            'Зелень'
        ],
        instructions: [
            'Лук мелко нарезать',
            'Смешать все ингредиенты',
            'Сформировать котлеты',
            'Выпекать в духовке при 180°C 25-30 минут',
            'Подавать с овощами'
        ],
        nutrition: {
            proteins: 22,
            fats: 8,
            carbs: 10
        }
    },
    {
        id: 'recipe3',
        name: 'Салат с киноа и авокадо',
        category: 'ужин',
        calories: 320,
        time: 25,
        difficulty: 'легко',
        ingredients: [
            '100г киноа',
            '1 авокадо',
            '100г помидоров черри',
            '50г рукколы',
            'Лимонный сок',
            'Оливковое масло',
            'Соль, перец'
        ],
        instructions: [
            'Отварить киноа по инструкции',
            'Нарезать авокадо и помидоры',
            'Смешать все ингредиенты',
            'Заправить лимонным соком и маслом'
        ],
        nutrition: {
            proteins: 12,
            fats: 20,
            carbs: 25
        }
    },
    {
        id: 'recipe4',
        name: 'Протеиновый шейк',
        category: 'перекус',
        calories: 210,
        time: 5,
        difficulty: 'легко',
        ingredients: [
            '250мл молока',
            '1 банан',
            '30г протеина',
            '5г семян льна',
            'Корица'
        ],
        instructions: [
            'Смешать все в блендере',
            'Пить сразу после приготовления'
        ],
        nutrition: {
            proteins: 30,
            fats: 8,
            carbs: 15
        }
    },
    {
        id: 'recipe5',
        name: 'Запеченная рыба с овощами',
        category: 'обед',
        calories: 350,
        time: 35,
        difficulty: 'средне',
        ingredients: [
            '2 филе белой рыбы',
            '200г овощей (кабачок, перец, брокколи)',
            'Лимон',
            'Чеснок',
            'Оливковое масло',
            'Травы'
        ],
        instructions: [
            'Нарезать овощи',
            'Выложить рыбу и овощи на противень',
            'Сбрызнуть маслом, добавить специи',
            'Запекать 25 минут при 180°C'
        ],
        nutrition: {
            proteins: 35,
            fats: 12,
            carbs: 20
        }
    },
    {
        id: 'recipe6',
        name: 'Гречневая каша с грибами',
        category: 'ужин',
        calories: 280,
        time: 30,
        difficulty: 'легко',
        ingredients: [
            '100г гречки',
            '150г шампиньонов',
            '1 луковица',
            'Сметана 10%',
            'Зелень',
            'Специи'
        ],
        instructions: [
            'Отварить гречку',
            'Обжарить лук и грибы',
            'Смешать с гречкой',
            'Добавить сметану и зелень'
        ],
        nutrition: {
            proteins: 15,
            fats: 8,
            carbs: 40
        }
    }
];

// ===== НАСТРОЙКА ПРОФИЛЯ =====
function saveProfile() {
    const name = document.getElementById('profile-name-input').value.trim();
    const age = parseInt(document.getElementById('profile-age-input').value);
    const gender = document.getElementById('profile-gender-input').value;
    const weight = parseInt(document.getElementById('profile-weight-input').value);
    const height = parseInt(document.getElementById('profile-height-input').value);
    const goal = document.getElementById('profile-goal-input').value;
    
    if (!name || name.length < 2) {
        showNotification('Введите ваше имя (минимум 2 символа)');
        return;
    }
    
    if (!age || age < 10 || age > 100) {
        showNotification('Введите корректный возраст (10-100 лет)');
        return;
    }
    
    if (!gender) {
        showNotification('Выберите ваш пол');
        return;
    }
    
    if (!weight || weight < 30 || weight > 250) {
        showNotification('Введите корректный вес (30-250 кг)');
        return;
    }
    
    if (!height || height < 100 || height > 250) {
        showNotification('Введите корректный рост (100-250 см)');
        return;
    }
    
    if (!goal) {
        showNotification('Выберите вашу цель');
        return;
    }
    
    currentUser = {
        name: name,
        age: age,
        gender: gender,
        weight: weight,
        height: height,
        goal: goal,
        streak: 0,
        createdAt: new Date().toISOString(),
        totalWorkouts: 0,
        totalMinutes: 0,
        totalCalories: 0
    };
    
    localStorage.setItem('fitnesspro_user', JSON.stringify(currentUser));
    showScreen('home');
    showNotification(`Добро пожаловать, ${name}! 🎉`);
}

// ===== НАВИГАЦИЯ =====
function showScreen(screenId) {
    console.log('Переход на экран:', screenId);
    
    if (screenId !== 'profile-setup' && screenId !== 'profile-edit' && screenId !== 'diary-detail' && 
        screenId !== 'workout-timer' && screenId !== 'workout-detail') {
        const savedUser = localStorage.getItem('fitnesspro_user');
        if (!savedUser && screenId !== 'profile-setup') {
            console.log('Пользователь не найден, перенаправляем на настройку профиля');
            showScreen('profile-setup');
            return;
        }
    }
    
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    const targetScreen = document.getElementById(screenId + '-screen');
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenId;
    } else {
        console.error('Экран не найден:', screenId);
        const homeScreen = document.getElementById('home-screen');
        if (homeScreen) {
            homeScreen.classList.add('active');
            currentScreen = 'home';
        }
    }
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    if (screenId !== 'profile-setup' && screenId !== 'profile-edit' && screenId !== 'diary-detail' && 
        screenId !== 'workout-timer' && screenId !== 'workout-detail') {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            if (item.getAttribute('onclick') && item.getAttribute('onclick').includes(screenId)) {
                item.classList.add('active');
            }
        });
    }
    
    updateBackButtonVisibility();
    
    switch(screenId) {
        case 'home':
            updateHomeScreen();
            break;
        case 'workouts':
            loadWorkoutsList('all');
            break;
        case 'diary':
            loadDiaryWorkouts();
            break;
        case 'nutrition':
            showNutritionTab('week');
            showDayMeals('monday');
            break;
        case 'progress':
            updateProgressScreen();
            break;
        case 'profile':
            updateProfileScreen();
            break;
        case 'calculator':
            loadCalculationHistory();
            break;
        case 'profile-edit':
            fillProfileEditForm();
            break;
        case 'workout-timer':
            setupWorkoutTimer();
            break;
    }
}

function goBack() {
    switch(currentScreen) {
        case 'profile-edit':
            showScreen('profile');
            break;
        case 'diary-detail':
            showScreen('diary');
            break;
        case 'workout-detail':
            showScreen('workouts');
            break;
        case 'workout-timer':
            if (confirm('Прервать тренировку?')) {
                stopWorkoutTimer();
                showScreen('workouts');
            }
            break;
        default:
            showScreen('home');
    }
}

function fillProfileEditForm() {
    if (!currentUser) {
        showScreen('home');
        return;
    }
    
    document.getElementById('edit-name').value = currentUser.name || '';
    document.getElementById('edit-age').value = currentUser.age || '';
    document.getElementById('edit-gender').value = currentUser.gender || '';
    document.getElementById('edit-weight').value = currentUser.weight || '';
    document.getElementById('edit-height').value = currentUser.height || '';
    document.getElementById('edit-goal').value = currentUser.goal || '';
}

function saveProfileChanges() {
    if (!currentUser) return;
    
    const name = document.getElementById('edit-name').value.trim();
    const age = parseInt(document.getElementById('edit-age').value);
    const gender = document.getElementById('edit-gender').value;
    const weight = parseInt(document.getElementById('edit-weight').value);
    const height = parseInt(document.getElementById('edit-height').value);
    const goal = document.getElementById('edit-goal').value;
    
    if (!name || name.length < 2) {
        showNotification('Введите ваше имя (минимум 2 символа)');
        return;
    }
    
    if (!age || age < 10 || age > 100) {
        showNotification('Введите корректный возраст (10-100 лет)');
        return;
    }
    
    if (!gender) {
        showNotification('Выберите ваш пол');
        return;
    }
    
    if (!weight || weight < 30 || weight > 250) {
        showNotification('Введите корректный вес (30-250 кг)');
        return;
    }
    
    if (!height || height < 100 || height > 250) {
        showNotification('Введите корректный рост (100-250 см)');
        return;
    }
    
    if (!goal) {
        showNotification('Выберите вашу цель');
        return;
    }
    
    currentUser.name = name;
    currentUser.age = age;
    currentUser.gender = gender;
    currentUser.weight = weight;
    currentUser.height = height;
    currentUser.goal = goal;
    currentUser.updatedAt = new Date().toISOString();
    
    localStorage.setItem('fitnesspro_user', JSON.stringify(currentUser));
    showScreen('profile');
    showNotification('Профиль успешно обновлен! ✅');
}

// ===== ТРЕНИРОВКИ С ТАЙМЕРОМ =====
function startWorkout(workoutId) {
    const allWorkouts = [...homeWorkouts, ...gymWorkouts, ...cardioWorkouts, ...restWorkouts];
    const workout = allWorkouts.find(w => w.id === workoutId);
    
    if (!workout) return;
    
    currentWorkout = workout;
    currentExerciseIndex = 0;
    isResting = false;
    currentSet = 1;
    
    showScreen('workout-timer');
}

function setupWorkoutTimer() {
    if (!currentWorkout) return;
    
    const container = document.getElementById('workout-timer-content');
    if (!container) return;
    
    container.innerHTML = `
        <div style="background: white; border-radius: 20px; padding: 25px; margin-bottom: 20px; box-shadow: 0 6px 20px rgba(0,0,0,0.08);">
            <h2 style="color: #007AFF; margin-bottom: 10px;">${currentWorkout.name}</h2>
            <p style="color: #666; margin-bottom: 20px;">${currentWorkout.description}</p>
            
            <div style="text-align: center; margin-bottom: 30px;">
                <div id="timer-display" style="font-size: 4em; font-weight: 800; color: #007AFF; margin: 20px 0; min-height: 100px; display: flex; align-items: center; justify-content: center;">
                    00:00
                </div>
                <div id="exercise-name" style="font-size: 1.5em; font-weight: 600; margin-bottom: 10px;">
                    Готовы начать?
                </div>
                <div id="exercise-info" style="color: #666; margin-bottom: 20px;">
                    Всего упражнений: ${currentWorkout.exercises.length}
                </div>
                <div id="set-info" style="color: #666; margin-bottom: 20px; display: none;">
                    Подход <span id="current-set">1</span> из <span id="total-sets">1</span>
                </div>
            </div>
            
            <div style="display: flex; gap: 15px; margin-bottom: 20px;">
                <button class="btn-primary" id="start-timer-btn" onclick="startTimer()" style="flex: 1;">
                    <i class="fas fa-play"></i> Начать тренировку
                </button>
                <button class="btn-secondary" onclick="pauseResumeTimer()" id="pause-btn" style="flex: 1;" disabled>
                    <i class="fas fa-pause"></i> Пауза
                </button>
            </div>
            
            <button class="btn-primary" onclick="stopWorkoutTimer()" style="width: 100%; background: #FF3B30;">
                <i class="fas fa-stop"></i> Завершить тренировку
            </button>
            
            <div style="margin-top: 30px;">
                <h4 style="margin-bottom: 15px; color: #333;">План тренировки:</h4>
                <div id="exercise-list-timer" style="max-height: 300px; overflow-y: auto;">
                    ${currentWorkout.exercises.map((exercise, index) => `
                        <div id="exercise-${index}" style="padding: 12px; margin-bottom: 8px; background: #f8f9fa; border-radius: 10px; border-left: 4px solid #e0e0e0;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: 600;">${exercise.name}</div>
                                    <div style="color: #666; font-size: 0.9em;">
                                        ${exercise.duration} сек
                                        ${exercise.rest ? `• Отдых: ${exercise.rest} сек` : ''}
                                        ${exercise.sets > 1 ? `• ${exercise.sets} подхода` : ''}
                                        ${exercise.reps ? `• ${exercise.reps} повторений` : ''}
                                    </div>
                                </div>
                                <span id="exercise-status-${index}" style="color: #999; font-size: 0.9em;">Ожидание</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    workoutTimeLeft = 0;
    updateTimerDisplay();
}

function startTimer() {
    if (!currentWorkout || currentExerciseIndex >= currentWorkout.exercises.length) {
        showNotification('Тренировка завершена! 🎉');
        completeWorkout();
        return;
    }
    
    const startBtn = document.getElementById('start-timer-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const setInfo = document.getElementById('set-info');
    
    if (startBtn) startBtn.disabled = true;
    if (pauseBtn) pauseBtn.disabled = false;
    if (setInfo) setInfo.style.display = 'block';
    
    const exercise = currentWorkout.exercises[currentExerciseIndex];
    totalSets = exercise.sets || 1;
    
    if (isResting) {
        document.getElementById('exercise-name').textContent = `Отдых после: ${exercise.name}`;
        workoutTimeLeft = exercise.rest;
        document.getElementById('exercise-status-' + currentExerciseIndex).textContent = `Отдых (${currentSet}/${totalSets})`;
        document.getElementById('exercise-status-' + currentExerciseIndex).style.color = '#4CD964';
    } else {
        document.getElementById('exercise-name').textContent = `${exercise.name} (${currentSet}/${totalSets})`;
        workoutTimeLeft = exercise.duration;
        document.getElementById('exercise-status-' + currentExerciseIndex).textContent = `Выполняется (${currentSet}/${totalSets})`;
        document.getElementById('exercise-status-' + currentExerciseIndex).style.color = '#007AFF';
        document.getElementById('exercise-' + currentExerciseIndex).style.borderLeftColor = '#007AFF';
        
        document.getElementById('current-set').textContent = currentSet;
        document.getElementById('total-sets').textContent = totalSets;
    }
    
    updateTimerDisplay();
    
    workoutTimer = setInterval(() => {
        workoutTimeLeft--;
        updateTimerDisplay();
        
        if (workoutTimeLeft <= 0) {
            clearInterval(workoutTimer);
            
            if (isResting) {
                isResting = false;
                currentSet++;
                
                if (currentSet <= totalSets) {
                    setTimeout(startTimer, 1000);
                } else {
                    currentSet = 1;
                    currentExerciseIndex++;
                    
                    if (currentExerciseIndex < currentWorkout.exercises.length) {
                        setTimeout(startTimer, 1000);
                    } else {
                        completeWorkout();
                    }
                }
            } else {
                isResting = true;
                setTimeout(startTimer, 1000);
            }
        }
    }, 1000);
}

function pauseResumeTimer() {
    const pauseBtn = document.getElementById('pause-btn');
    
    if (workoutTimer) {
        clearInterval(workoutTimer);
        workoutTimer = null;
        pauseBtn.innerHTML = '<i class="fas fa-play"></i> Продолжить';
    } else {
        startTimer();
        pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Пауза';
    }
}

function stopWorkoutTimer() {
    if (workoutTimer) {
        clearInterval(workoutTimer);
        workoutTimer = null;
    }
    
    showScreen('workouts');
    showNotification('Тренировка прервана');
}

function updateTimerDisplay() {
    const timerDisplay = document.getElementById('timer-display');
    if (!timerDisplay) return;
    
    const minutes = Math.floor(workoutTimeLeft / 60);
    const seconds = workoutTimeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    if (workoutTimeLeft <= 10 && workoutTimeLeft > 0) {
        timerDisplay.style.color = '#FF3B30';
        timerDisplay.style.animation = 'pulse 0.5s infinite';
    } else if (workoutTimeLeft <= 30 && workoutTimeLeft > 10) {
        timerDisplay.style.color = '#FF9500';
        timerDisplay.style.animation = 'pulse 1s infinite';
    } else {
        timerDisplay.style.color = '#007AFF';
        timerDisplay.style.animation = 'none';
    }
}

function completeWorkout() {
    showNotification('Тренировка завершена! Отличная работа! 🎉');
    
    const diaryRecord = {
        id: Date.now(),
        name: currentWorkout.name,
        duration: currentWorkout.duration,
        calories: currentWorkout.calories,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'}),
        type: currentWorkout.type,
        notes: 'Выполнена с таймером',
        exercises: currentWorkout.exercises.map(e => e.name)
    };
    
    diaryWorkouts.push(diaryRecord);
    localStorage.setItem('fitnesspro_diary', JSON.stringify(diaryWorkouts));
    
    if (currentUser) {
        currentUser.totalWorkouts = (currentUser.totalWorkouts || 0) + 1;
        currentUser.totalMinutes = (currentUser.totalMinutes || 0) + currentWorkout.duration;
        currentUser.totalCalories = (currentUser.totalCalories || 0) + currentWorkout.calories;
        currentUser.streak = (currentUser.streak || 0) + 1;
        localStorage.setItem('fitnesspro_user', JSON.stringify(currentUser));
    }
    
    showScreen('diary');
    loadDiaryWorkouts();
}

// ===== ГЛАВНЫЙ ЭКРАН =====
function updateHomeScreen() {
    if (!currentUser) {
        showScreen('profile-setup');
        return;
    }
    
    document.getElementById('user-name').textContent = currentUser.name;
    document.getElementById('streak-count').textContent = '🔥' + (currentUser.streak || 0);
    
    const today = new Date().toISOString().split('T')[0];
    const todayWorkouts = diaryWorkouts.filter(w => w.date === today);
    
    dailyActivity.minutes = todayWorkouts.reduce((sum, w) => sum + w.duration, 0);
    dailyActivity.calories = todayWorkouts.reduce((sum, w) => sum + w.calories, 0);
    
    document.getElementById('today-activity').textContent = dailyActivity.minutes;
    document.getElementById('today-calories').textContent = dailyActivity.calories;
    document.getElementById('today-water').textContent = waterIntake;
    
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = now.toLocaleDateString('ru-RU', options);
    
    updateWaterDisplay();
    updateTodayPlan();
    updateRecommendedWorkouts();
}

function updateWaterDisplay() {
    const progress = (waterIntake / 8) * 100;
    const waterFill = document.getElementById('water-fill');
    const waterCurrent = document.getElementById('water-current');
    
    if (waterFill) waterFill.style.width = `${progress}%`;
    if (waterCurrent) waterCurrent.textContent = `${waterIntake} / 8 стаканов`;
}

function addWater(amount) {
    waterIntake += amount;
    if (waterIntake > 8) waterIntake = 8;
    updateWaterDisplay();
    localStorage.setItem('fitnesspro_water', waterIntake.toString());
    showNotification(`Выпито ${amount} стакана воды! 💧`);
}

function resetWater() {
    waterIntake = 0;
    updateWaterDisplay();
    localStorage.setItem('fitnesspro_water', waterIntake.toString());
    showNotification('Счетчик воды сброшен 🔄');
}

function updateTodayPlan() {
    const container = document.getElementById('today-plan');
    if (!container) return;
    
    const today = new Date().getDay();
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayName = days[today];
    
    if (weeklyMeals[dayName]) {
        const meals = weeklyMeals[dayName];
        container.innerHTML = `
            <div class="meal-item">
                <div class="meal-time">
                    <i class="fas fa-sun"></i>
                    <span>${meals.breakfast.time} • Завтрак</span>
                </div>
                <div class="meal-name">${meals.breakfast.name}</div>
                <div class="meal-description">${meals.breakfast.description}</div>
                <span class="meal-calories">${meals.breakfast.calories} ккал</span>
            </div>
            
            <div class="meal-item">
                <div class="meal-time">
                    <i class="fas fa-utensils"></i>
                    <span>${meals.lunch.time} • Обед</span>
                </div>
                <div class="meal-name">${meals.lunch.name}</div>
                <div class="meal-description">${meals.lunch.description}</div>
                <span class="meal-calories">${meals.lunch.calories} ккал</span>
            </div>
            
            <div class="meal-item">
                <div class="meal-time">
                    <i class="fas fa-moon"></i>
                    <span>${meals.dinner.time} • Ужин</span>
                </div>
                <div class="meal-name">${meals.dinner.name}</div>
                <div class="meal-description">${meals.dinner.description}</div>
                <span class="meal-calories">${meals.dinner.calories} ккал</span>
            </div>
            
            ${meals.snacks && meals.snacks.length > 0 ? `
                <div class="meal-item">
                    <div class="meal-time">
                        <i class="fas fa-apple-alt"></i>
                        <span>Перекусы</span>
                    </div>
                    <div class="meal-name">${meals.snacks.map(s => `${s.time}: ${s.name}`).join(', ')}</div>
                    <div class="meal-description">Всего перекусов: ${meals.snacks.length}</div>
                    <span class="meal-calories">${meals.snacks.reduce((sum, s) => sum + s.calories, 0)} ккал</span>
                </div>
            ` : ''}
            
            <div style="margin-top: 20px; padding-top: 15px; border-top: 2px solid #f0f0f0;">
                <div style="display: flex; justify-content: space-between; font-weight: 600; color: #007AFF;">
                    <span>Итого за день:</span>
                    <span>${meals.totalCalories} ккал</span>
                </div>
            </div>
        `;
    } else {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">План питания на сегодня не настроен</p>';
    }
}

function updateRecommendedWorkouts() {
    const container = document.getElementById('recommended-workouts');
    if (!container) return;
    
    const recommended = [...homeWorkouts.slice(0, 2), ...gymWorkouts.slice(0, 1), ...restWorkouts.slice(0, 1)];
    
    container.innerHTML = recommended.map(workout => `
        <div class="recommendation-item" onclick="showWorkoutDetail('${workout.id}')">
            <div class="recommendation-info">
                <h3>${workout.name}</h3>
                <p>${workout.description}</p>
                <div style="display: flex; gap: 10px; margin-top: 5px; font-size: 0.85em; color: #666;">
                    <span>⏱ ${workout.duration} мин</span>
                    <span>🔥 ${workout.calories} ккал</span>
                    <span>${workout.difficulty}</span>
                </div>
            </div>
            <button class="btn-small" onclick="event.stopPropagation(); startWorkout('${workout.id}')">
                <i class="fas fa-play"></i> Начать
            </button>
        </div>
    `).join('');
}

// ===== ДЕТАЛИ ТРЕНИРОВКИ =====
function showWorkoutDetail(workoutId) {
    const allWorkouts = [...homeWorkouts, ...gymWorkouts, ...cardioWorkouts, ...restWorkouts];
    const workout = allWorkouts.find(w => w.id === workoutId);
    
    if (!workout) return;
    
    currentWorkout = workout;
    
    const detailScreen = document.getElementById('workout-detail-screen');
    if (!detailScreen) {
        createWorkoutDetailScreen();
    }
    
    updateWorkoutDetail();
    showScreen('workout-detail');
}

function createWorkoutDetailScreen() {
    const detailScreen = document.createElement('div');
    detailScreen.id = 'workout-detail-screen';
    detailScreen.className = 'screen';
    detailScreen.innerHTML = `
        <button class="btn-back" onclick="goBack()">
            <i class="fas fa-arrow-left"></i>
            <span>Назад</span>
        </button>
        <div class="header">
            <div class="header-content">
                <div>
                    <h1><i class="fas fa-dumbbell"></i> Тренировка</h1>
                    <p id="detail-workout-name"></p>
                </div>
            </div>
        </div>
        
        <div class="main-content">
            <div id="workout-detail-content"></div>
        </div>
    `;
    
    document.body.appendChild(detailScreen);
}

function updateWorkoutDetail() {
    if (!currentWorkout) return;
    
    const workoutName = document.getElementById('detail-workout-name');
    const content = document.getElementById('workout-detail-content');
    
    if (!workoutName || !content) return;
    
    workoutName.textContent = currentWorkout.name;
    
    const totalExercises = currentWorkout.exercises.length;
    const totalDuration = currentWorkout.exercises.reduce((sum, e) => sum + (e.duration * (e.sets || 1)), 0);
    const totalRest = currentWorkout.exercises.reduce((sum, e) => sum + (e.rest || 0), 0);
    
    content.innerHTML = `
        <div style="background: white; border-radius: 20px; padding: 25px; margin-bottom: 20px; box-shadow: 0 6px 20px rgba(0,0,0,0.08);">
            <h2 style="color: #007AFF; margin-bottom: 15px;">${currentWorkout.name}</h2>
            <p style="color: #666; margin-bottom: 20px; line-height: 1.5;">${currentWorkout.description}</p>
            
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 25px;">
                <div style="background: #f8f9fa; padding: 15px; border-radius: 12px; text-align: center;">
                    <div style="font-size: 1.2em; font-weight: 700; color: #007AFF;">${currentWorkout.duration}</div>
                    <div style="color: #666; font-size: 0.9em;">минут</div>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 12px; text-align: center;">
                    <div style="font-size: 1.2em; font-weight: 700; color: #4CD964;">${currentWorkout.calories}</div>
                    <div style="color: #666; font-size: 0.9em;">ккал</div>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 12px; text-align: center;">
                    <div style="font-size: 1.2em; font-weight: 700; color: #FF9500;">${currentWorkout.difficulty}</div>
                    <div style="color: #666; font-size: 0.9em;">сложность</div>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 12px; text-align: center;">
                    <div style="font-size: 1.2em; font-weight: 700; color: #FF3B30;">
                        ${currentWorkout.type === 'home' ? 'Дома' : 
                          currentWorkout.type === 'gym' ? 'Зал' : 
                          currentWorkout.type === 'cardio' ? 'Кардио' : 'Отдых'}
                    </div>
                    <div style="color: #666; font-size: 0.9em;">тип</div>
                </div>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h3 style="margin-bottom: 15px; color: #333;"><i class="fas fa-info-circle"></i> Статистика:</h3>
                <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                    <span style="background: #e3f2fd; color: #1976d2; padding: 8px 15px; border-radius: 20px; font-size: 0.9em;">
                        <i class="fas fa-list-ol"></i> Упражнений: ${totalExercises}
                    </span>
                    <span style="background: #e8f5e9; color: #388e3c; padding: 8px 15px; border-radius: 20px; font-size: 0.9em;">
                        <i class="fas fa-clock"></i> Работа: ${Math.round(totalDuration/60)} мин
                    </span>
                    <span style="background: #fff3e0; color: #f57c00; padding: 8px 15px; border-radius: 20px; font-size: 0.9em;">
                        <i class="fas fa-bed"></i> Отдых: ${Math.round(totalRest/60)} мин
                    </span>
                </div>
            </div>
            
            <h3 style="margin-bottom: 15px; color: #333;"><i class="fas fa-list-ol"></i> Упражнения:</h3>
            <div style="background: #f8f9fa; border-radius: 15px; padding: 20px; margin-bottom: 25px;">
                ${currentWorkout.exercises.map((exercise, index) => `
                    <div style="padding: 15px 0; ${index < currentWorkout.exercises.length - 1 ? 'border-bottom: 1px solid #e0e0e0;' : ''}">
                        <div style="display: flex; align-items: flex-start; gap: 10px;">
                            <span style="background: ${exercise.name.includes('Отдых') ? '#4CD964' : '#007AFF'}; 
                                color: white; width: 30px; height: 30px; border-radius: 50%; 
                                display: flex; align-items: center; justify-content: center; 
                                font-size: 0.9em; flex-shrink: 0;">${index + 1}</span>
                            <div style="flex: 1;">
                                <div style="font-weight: 600; margin-bottom: 5px;">${exercise.name}</div>
                                <div style="color: #666; font-size: 0.9em; display: flex; gap: 15px; flex-wrap: wrap;">
                                    <span><i class="fas fa-clock"></i> ${exercise.duration} сек</span>
                                    ${exercise.rest ? `<span><i class="fas fa-bed"></i> Отдых: ${exercise.rest} сек</span>` : ''}
                                    ${exercise.sets > 1 ? `<span><i class="fas fa-redo"></i> ${exercise.sets} подхода</span>` : ''}
                                    ${exercise.reps ? `<span><i class="fas fa-hashtag"></i> ${exercise.reps} повторений</span>` : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div style="display: flex; gap: 15px;">
                <button class="btn-primary" onclick="startWorkout('${currentWorkout.id}')" style="flex: 2;">
                    <i class="fas fa-play"></i> Начать тренировку с таймером
                </button>
                <button class="btn-secondary" onclick="addWorkoutToDiary('${currentWorkout.id}')" style="flex: 1;">
                    <i class="fas fa-plus"></i> В дневник
                </button>
            </div>
        </div>
    `;
}

function loadWorkoutsList(type = 'all') {
    const container = document.getElementById('workout-list');
    if (!container) return;
    
    let filteredWorkouts = [];
    let count = 0;
    
    switch(type) {
        case 'home': 
            filteredWorkouts = homeWorkouts; 
            count = homeWorkouts.length;
            break;
        case 'gym': 
            filteredWorkouts = gymWorkouts; 
            count = gymWorkouts.length;
            break;
        case 'cardio': 
            filteredWorkouts = cardioWorkouts; 
            count = cardioWorkouts.length;
            break;
        case 'rest': 
            filteredWorkouts = restWorkouts; 
            count = restWorkouts.length;
            break;
        default: 
            filteredWorkouts = [...homeWorkouts, ...gymWorkouts, ...cardioWorkouts, ...restWorkouts];
            count = homeWorkouts.length + gymWorkouts.length + cardioWorkouts.length + restWorkouts.length;
    }
    
    container.innerHTML = filteredWorkouts.map(workout => `
        <div class="workout-card" onclick="showWorkoutDetail('${workout.id}')">
            <h3>${workout.name}</h3>
            <p>${workout.description}</p>
            <div class="workout-stats">
                <div class="workout-stat"><i class="fas fa-clock"></i>${workout.duration} мин</div>
                <div class="workout-stat"><i class="fas fa-fire"></i>${workout.calories} ккал</div>
                <div class="workout-stat"><i class="fas fa-signal"></i>${workout.difficulty}</div>
                <div class="workout-stat">
                    <i class="fas fa-dumbbell"></i>
                    ${workout.type === 'home' ? 'Дома' : 
                     workout.type === 'gym' ? 'Зал' : 
                     workout.type === 'cardio' ? 'Кардио' : 'Отдых'}
                </div>
            </div>
            <div style="display: flex; gap: 10px; margin-top: 15px;">
                <button class="btn-primary" onclick="event.stopPropagation(); startWorkout('${workout.id}')" style="flex: 2;">
                    <i class="fas fa-play"></i> Начать
                </button>
                <button class="btn-secondary" onclick="event.stopPropagation(); addWorkoutToDiary('${workout.id}')" style="flex: 1;">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.includes('Все') && type === 'all') btn.classList.add('active');
        if (btn.textContent.includes('Домашние') && type === 'home') btn.classList.add('active');
        if (btn.textContent.includes('Зал') && type === 'gym') btn.classList.add('active');
        if (btn.textContent.includes('Кардио') && type === 'cardio') btn.classList.add('active');
        if (btn.textContent.includes('Отдых') && type === 'rest') btn.classList.add('active');
    });
}

// ===== ДНЕВНИК ТРЕНИРОВОК =====
function showAddWorkoutModal() {
    document.getElementById('add-workout-modal').style.display = 'flex';
    document.getElementById('exercise-list').innerHTML = '';
    addExerciseField();
}

function closeAddWorkoutModal() {
    document.getElementById('add-workout-modal').style.display = 'none';
}

function addExerciseField() {
    const container = document.getElementById('exercise-list');
    const exerciseDiv = document.createElement('div');
    exerciseDiv.className = 'exercise-item';
    exerciseDiv.innerHTML = `
        <input type="text" class="form-input exercise-input" placeholder="Упражнение (напр: Приседания 3x15)" value="">
        <button type="button" class="exercise-remove" onclick="removeExercise(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    container.appendChild(exerciseDiv);
}

function removeExercise(button) {
    const exerciseItem = button.closest('.exercise-item');
    exerciseItem.remove();
}

function saveWorkoutToDiary() {
    const name = document.getElementById('workout-name').value.trim();
    const duration = parseInt(document.getElementById('workout-duration').value) || 0;
    const calories = parseInt(document.getElementById('workout-calories').value) || 0;
    const type = document.getElementById('workout-type').value;
    const notes = document.getElementById('workout-notes').value.trim();
    
    if (!name) {
        showNotification('Введите название тренировки');
        return;
    }
    
    if (!duration || duration <= 0) {
        showNotification('Введите длительность тренировки');
        return;
    }
    
    if (!type) {
        showNotification('Выберите тип тренировки');
        return;
    }
    
    const exerciseInputs = document.querySelectorAll('.exercise-input');
    const exercises = Array.from(exerciseInputs)
        .map(input => input.value.trim())
        .filter(exercise => exercise.length > 0);
    
    const diaryRecord = {
        id: Date.now(),
        name: name,
        duration: duration,
        calories: calories,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'}),
        type: type,
        notes: notes,
        exercises: exercises
    };
    
    diaryWorkouts.push(diaryRecord);
    localStorage.setItem('fitnesspro_diary', JSON.stringify(diaryWorkouts));
    
    closeAddWorkoutModal();
    showNotification(`Тренировка "${name}" добавлена в дневник! 📝`);
    
    showScreen('diary');
    loadDiaryWorkouts();
}

function addWorkoutToDiary(workoutId) {
    const allWorkouts = [...homeWorkouts, ...gymWorkouts, ...cardioWorkouts, ...restWorkouts];
    const workout = allWorkouts.find(w => w.id === workoutId);
    
    if (!workout) return;
    
    const diaryRecord = {
        id: Date.now(),
        name: workout.name,
        duration: workout.duration,
        calories: workout.calories,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'}),
        type: workout.type,
        notes: 'Добавлена из каталога тренировок',
        exercises: workout.exercises.map(e => e.name)
    };
    
    diaryWorkouts.push(diaryRecord);
    localStorage.setItem('fitnesspro_diary', JSON.stringify(diaryWorkouts));
    showNotification(`Тренировка "${workout.name}" добавлена в дневник! 📝`);
    loadDiaryWorkouts();
}

function loadDiaryWorkouts() {
    const container = document.getElementById('workout-history');
    if (!container) return;
    
    if (diaryWorkouts.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; color: #666;">
                <i class="fas fa-book" style="font-size: 3em; margin-bottom: 20px; color: #e0e0e0;"></i>
                <h3 style="margin-bottom: 10px;">Дневник тренировок пуст</h3>
                <p>Добавьте свою первую тренировку!</p>
            </div>
        `;
        return;
    }
    
    const sortedWorkouts = [...diaryWorkouts].sort((a, b) => b.id - a.id);
    
    container.innerHTML = sortedWorkouts.map(workout => `
        <div class="diary-item" onclick="showDiaryDetail(${workout.id})" style="padding: 15px; border-bottom: 1px solid #f0f0f0; cursor: pointer;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <h4 style="margin: 0; color: #007AFF;">${workout.name}</h4>
                <span style="font-size: 0.85em; color: #666;">${workout.date}</span>
            </div>
            <div style="display: flex; gap: 15px; margin-bottom: 10px;">
                <span style="background: #f0f0f0; padding: 5px 10px; border-radius: 12px; font-size: 0.85em;">
                    <i class="fas fa-clock"></i> ${workout.duration} мин
                </span>
                <span style="background: #f0f0f0; padding: 5px 10px; border-radius: 12px; font-size: 0.85em;">
                    <i class="fas fa-fire"></i> ${workout.calories} ккал
                </span>
                <span style="background: #f0f0f0; padding: 5px 10px; border-radius: 12px; font-size: 0.85em;">
                    ${workout.type === 'home' ? '🏠 Дома' : 
                     workout.type === 'gym' ? '🏋️ Зал' : 
                     workout.type === 'cardio' ? '🏃 Кардио' : '🌿 Отдых'}
                </span>
            </div>
            ${workout.notes ? `<p style="color: #666; font-size: 0.9em; margin: 0;">${workout.notes}</p>` : ''}
        </div>
    `).join('');
}

function showDiaryDetail(workoutId) {
    const workout = diaryWorkouts.find(w => w.id === workoutId);
    if (!workout) return;
    
    document.getElementById('diary-detail-date').textContent = `${workout.date} ${workout.time}`;
    
    const content = document.getElementById('diary-detail-content');
    content.innerHTML = `
        <div style="background: white; border-radius: 20px; padding: 25px; margin-bottom: 20px; box-shadow: 0 6px 20px rgba(0,0,0,0.08);">
            <h2 style="color: #007AFF; margin-bottom: 15px;">${workout.name}</h2>
            
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 25px;">
                <div style="background: #f8f9fa; padding: 15px; border-radius: 12px; text-align: center;">
                    <div style="font-size: 1.2em; font-weight: 700; color: #007AFF;">${workout.duration}</div>
                    <div style="color: #666; font-size: 0.9em;">минут</div>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 12px; text-align: center;">
                    <div style="font-size: 1.2em; font-weight: 700; color: #4CD964;">${workout.calories}</div>
                    <div style="color: #666; font-size: 0.9em;">ккал</div>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 12px; text-align: center;">
                    <div style="font-size: 1.2em; font-weight: 700; color: #FF9500;">${workout.date}</div>
                    <div style="color: #666; font-size: 0.9em;">дата</div>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 12px; text-align: center;">
                    <div style="font-size: 1.2em; font-weight: 700; color: #FF3B30;">${workout.time}</div>
                    <div style="color: #666; font-size: 0.9em;">время</div>
                </div>
            </div>
            
            ${workout.notes ? `
                <div style="background: #f0f8ff; border-radius: 12px; padding: 15px; margin-bottom: 20px;">
                    <h4 style="margin-bottom: 10px; color: #007AFF;"><i class="fas fa-sticky-note"></i> Заметки:</h4>
                    <p style="color: #333; margin: 0;">${workout.notes}</p>
                </div>
            ` : ''}
            
            ${workout.exercises && workout.exercises.length > 0 ? `
                <h3 style="margin-bottom: 15px; color: #333;"><i class="fas fa-list-ol"></i> Упражнения:</h3>
                <div style="background: #f8f9fa; border-radius: 15px; padding: 20px;">
                    ${workout.exercises.map((exercise, index) => `
                        <div style="padding: 15px 0; ${index < workout.exercises.length - 1 ? 'border-bottom: 1px solid #e0e0e0;' : ''}">
                            <div style="display: flex; align-items: flex-start; gap: 10px;">
                                <span style="background: #007AFF; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.9em; flex-shrink: 0;">${index + 1}</span>
                                <span style="line-height: 1.5;">${exercise}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            <button class="btn-primary" onclick="deleteDiaryWorkout(${workout.id})" style="width: 100%; margin-top: 25px; background: #FF3B30;">
                <i class="fas fa-trash"></i> Удалить запись
            </button>
        </div>
    `;
    
    showScreen('diary-detail');
}

function deleteDiaryWorkout(workoutId) {
    if (confirm('Вы уверены, что хотите удалить эту запись?')) {
        const index = diaryWorkouts.findIndex(w => w.id === workoutId);
        if (index !== -1) {
            diaryWorkouts.splice(index, 1);
            localStorage.setItem('fitnesspro_diary', JSON.stringify(diaryWorkouts));
            showNotification('Запись удалена');
            showScreen('diary');
            loadDiaryWorkouts();
        }
    }
}

// ===== ПИТАНИЕ =====
function showNutritionTab(tab) {
    document.querySelectorAll('.nutrition-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nutrition-tab-content').forEach(c => c.classList.remove('active'));
    
    event.target.classList.add('active');
    
    if (tab === 'week') {
        document.getElementById('week-plan').classList.add('active');
        showDayMeals('monday');
    } else if (tab === 'recipes') {
        document.getElementById('recipes-tab').classList.add('active');
        loadRecipes();
    } else {
        document.getElementById('bju-calculator').classList.add('active');
    }
}

function showDayMeals(day) {
    const container = document.getElementById('day-meals');
    if (!container) return;
    
    const meals = weeklyMeals[day];
    
    if (!meals) return;
    
    document.querySelectorAll('.day-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    container.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <h3 style="color: #007AFF; margin-bottom: 5px;">${meals.dayName}</h3>
            <div style="display: inline-block; background: #4CD964; color: white; padding: 5px 15px; border-radius: 20px; font-weight: 600; margin-top: 10px;">
                ${meals.totalCalories} ккал
            </div>
        </div>
        
        <div style="background: white; border-radius: 20px; padding: 25px; margin-bottom: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                <div style="background: #FFC107; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2em;">
                    <i class="fas fa-sun"></i>
                </div>
                <div>
                    <div style="font-weight: 600; color: #007AFF;">${meals.breakfast.time} • Завтрак</div>
                    <div style="font-size: 1.2em; font-weight: 700; margin-top: 5px;">${meals.breakfast.name}</div>
                </div>
            </div>
            <p style="color: #666; margin-bottom: 15px;">${meals.breakfast.description}</p>
            <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                <span style="background: #e3f2fd; color: #1976d2; padding: 5px 10px; border-radius: 15px; font-size: 0.85em;">Б: ${meals.breakfast.proteins}г</span>
                <span style="background: #e8f5e9; color: #388e3c; padding: 5px 10px; border-radius: 15px; font-size: 0.85em;">Ж: ${meals.breakfast.fats}г</span>
                <span style="background: #fff3e0; color: #f57c00; padding: 5px 10px; border-radius: 15px; font-size: 0.85em;">У: ${meals.breakfast.carbs}г</span>
            </div>
            <span style="background: #4CD964; color: white; padding: 5px 12px; border-radius: 20px; font-size: 0.9em; font-weight: 600;">
                ${meals.breakfast.calories} ккал
            </span>
        </div>
        
        <div style="background: white; border-radius: 20px; padding: 25px; margin-bottom: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                <div style="background: #4CAF50; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2em;">
                    <i class="fas fa-utensils"></i>
                </div>
                <div>
                    <div style="font-weight: 600; color: #007AFF;">${meals.lunch.time} • Обед</div>
                    <div style="font-size: 1.2em; font-weight: 700; margin-top: 5px;">${meals.lunch.name}</div>
                </div>
            </div>
            <p style="color: #666; margin-bottom: 15px;">${meals.lunch.description}</p>
            <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                <span style="background: #e3f2fd; color: #1976d2; padding: 5px 10px; border-radius: 15px; font-size: 0.85em;">Б: ${meals.lunch.proteins}г</span>
                <span style="background: #e8f5e9; color: #388e3c; padding: 5px 10px; border-radius: 15px; font-size: 0.85em;">Ж: ${meals.lunch.fats}г</span>
                <span style="background: #fff3e0; color: #f57c00; padding: 5px 10px; border-radius: 15px; font-size: 0.85em;">У: ${meals.lunch.carbs}г</span>
            </div>
            <span style="background: #4CD964; color: white; padding: 5px 12px; border-radius: 20px; font-size: 0.9em; font-weight: 600;">
                ${meals.lunch.calories} ккал
            </span>
        </div>
        
        <div style="background: white; border-radius: 20px; padding: 25px; margin-bottom: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                <div style="background: #2196F3; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2em;">
                    <i class="fas fa-moon"></i>
                </div>
                <div>
                    <div style="font-weight: 600; color: #007AFF;">${meals.dinner.time} • Ужин</div>
                    <div style="font-size: 1.2em; font-weight: 700; margin-top: 5px;">${meals.dinner.name}</div>
                </div>
            </div>
            <p style="color: #666; margin-bottom: 15px;">${meals.dinner.description}</p>
            <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                <span style="background: #e3f2fd; color: #1976d2; padding: 5px 10px; border-radius: 15px; font-size: 0.85em;">Б: ${meals.dinner.proteins}г</span>
                <span style="background: #e8f5e9; color: #388e3c; padding: 5px 10px; border-radius: 15px; font-size: 0.85em;">Ж: ${meals.dinner.fats}г</span>
                <span style="background: #fff3e0; color: #f57c00; padding: 5px 10px; border-radius: 15px; font-size: 0.85em;">У: ${meals.dinner.carbs}г</span>
            </div>
            <span style="background: #4CD964; color: white; padding: 5px 12px; border-radius: 20px; font-size: 0.9em; font-weight: 600;">
                ${meals.dinner.calories} ккал
            </span>
        </div>
        
        ${meals.snacks && meals.snacks.length > 0 ? `
            <div style="background: white; border-radius: 20px; padding: 25px; margin-bottom: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
                <h4 style="margin-bottom: 15px; color: #333;"><i class="fas fa-apple-alt"></i> Перекусы</h4>
                ${meals.snacks.map(snack => `
                    <div style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <div style="font-weight: 600;">${snack.name}</div>
                                <div style="color: #666; font-size: 0.9em;">${snack.time}</div>
                            </div>
                            <span style="background: #f8f9fa; padding: 5px 10px; border-radius: 15px; font-size: 0.9em;">
                                ${snack.calories} ккал
                            </span>
                        </div>
                    </div>
                `).join('')}
            </div>
        ` : ''}
    `;
}

function loadRecipes() {
    const container = document.getElementById('recipes-container');
    if (!container) return;
    
    container.innerHTML = `
        <div style="margin-bottom: 20px;">
            <h3 style="color: #333; margin-bottom: 15px;">${recipes.length} полезных рецептов</h3>
            <p style="color: #666; margin-bottom: 20px;">Простые и вкусные блюда для здорового питания</p>
        </div>
        
        ${recipes.map(recipe => `
            <div style="background: white; border-radius: 20px; padding: 25px; margin-bottom: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
                    <div>
                        <h4 style="color: #007AFF; margin-bottom: 5px;">${recipe.name}</h4>
                        <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                            <span style="background: #f0f0f0; padding: 3px 8px; border-radius: 12px; font-size: 0.85em;">${recipe.category}</span>
                            <span style="background: #f0f0f0; padding: 3px 8px; border-radius: 12px; font-size: 0.85em;">${recipe.difficulty}</span>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 1.5em; font-weight: 700; color: #4CD964;">${recipe.calories}</div>
                        <div style="color: #666; font-size: 0.85em;">ккал</div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                    <span style="background: #e3f2fd; color: #1976d2; padding: 5px 10px; border-radius: 15px; font-size: 0.85em;">Б: ${recipe.nutrition.proteins}г</span>
                    <span style="background: #e8f5e9; color: #388e3c; padding: 5px 10px; border-radius: 15px; font-size: 0.85em;">Ж: ${recipe.nutrition.fats}г</span>
                    <span style="background: #fff3e0; color: #f57c00; padding: 5px 10px; border-radius: 15px; font-size: 0.85em;">У: ${recipe.nutrition.carbs}г</span>
                    <span style="background: #f3e5f5; color: #7b1fa2; padding: 5px 10px; border-radius: 15px; font-size: 0.85em;">⏱ ${recipe.time} мин</span>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h5 style="margin-bottom: 10px; color: #333;"><i class="fas fa-shopping-basket"></i> Ингредиенты:</h5>
                    <div style="background: #f8f9fa; border-radius: 12px; padding: 15px;">
                        ${recipe.ingredients.map(ingredient => `
                            <div style="padding: 5px 0; color: #666; display: flex; align-items: center; gap: 8px;">
                                <i class="fas fa-check-circle" style="color: #4CD964; font-size: 0.9em;"></i>
                                <span>${ingredient}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div>
                    <h5 style="margin-bottom: 10px; color: #333;"><i class="fas fa-list-ol"></i> Приготовление:</h5>
                    <div style="background: #f0f8ff; border-radius: 12px; padding: 15px;">
                        ${recipe.instructions.map((step, index) => `
                            <div style="padding: 8px 0; border-bottom: 1px solid #e0f2fe; display: flex; gap: 10px;">
                                <span style="background: #007AFF; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.85em; flex-shrink: 0;">${index + 1}</span>
                                <span style="color: #333; line-height: 1.4;">${step}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('')}
    `;
}

function calculateBJU() {
    const calories = parseInt(document.getElementById('calories-input').value) || 2000;
    const goal = document.getElementById('bju-goal').value;
    
    let proteins, fats, carbs;
    
    switch(goal) {
        case 'weight_loss':
            proteins = Math.round(calories * 0.35 / 4);
            fats = Math.round(calories * 0.25 / 9);
            carbs = Math.round(calories * 0.40 / 4);
            break;
        case 'muscle_gain':
            proteins = Math.round(calories * 0.30 / 4);
            fats = Math.round(calories * 0.25 / 9);
            carbs = Math.round(calories * 0.45 / 4);
            break;
        default: // maintenance
            proteins = Math.round(calories * 0.30 / 4);
            fats = Math.round(calories * 0.30 / 9);
            carbs = Math.round(calories * 0.40 / 4);
    }
    
    const result = document.getElementById('bju-result');
    if (!result) return;
    
    result.innerHTML = `
        <h4 style="margin-bottom: 15px; color: #007AFF;">Результаты расчета:</h4>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px;">
            <div style="background: #e3f2fd; border-radius: 12px; padding: 20px; text-align: center;">
                <div style="font-size: 1.8em; font-weight: 800; color: #1976d2;">${proteins}г</div>
                <div style="color: #1976d2; font-weight: 600; margin-top: 5px;">Белки</div>
                <div style="color: #666; font-size: 0.85em; margin-top: 5px;">${Math.round(proteins * 4)} ккал</div>
            </div>
            <div style="background: #e8f5e9; border-radius: 12px; padding: 20px; text-align: center;">
                <div style="font-size: 1.8em; font-weight: 800; color: #388e3c;">${fats}г</div>
                <div style="color: #388e3c; font-weight: 600; margin-top: 5px;">Жиры</div>
                <div style="color: #666; font-size: 0.85em; margin-top: 5px;">${Math.round(fats * 9)} ккал</div>
            </div>
            <div style="background: #fff3e0; border-radius: 12px; padding: 20px; text-align: center;">
                <div style="font-size: 1.8em; font-weight: 800; color: #f57c00;">${carbs}г</div>
                <div style="color: #f57c00; font-weight: 600; margin-top: 5px;">Углеводы</div>
                <div style="color: #666; font-size: 0.85em; margin-top: 5px;">${Math.round(carbs * 4)} ккал</div>
            </div>
        </div>
        
        <div style="background: #f8f9fa; border-radius: 12px; padding: 15px; margin-top: 15px;">
            <h5 style="margin-bottom: 10px; color: #333;">Рекомендации:</h5>
            <ul style="color: #666; margin: 0; padding-left: 20px;">
                <li>Распределите белки равномерно на 3-4 приема пищи</li>
                <li>Отдавайте предпочтение сложным углеводам</li>
                <li>Используйте полезные жиры: орехи, авокадо, оливковое масло</li>
                <li>Пейте 2-2.5 литра воды в день</li>
            </ul>
        </div>
    `;
    result.style.display = 'block';
}

// ===== КНОПКА НАЗАД =====
function updateBackButtonVisibility() {
    const screensWithBack = ['profile-edit', 'diary-detail', 'workout-detail', 'workout-timer'];
    const backButton = document.querySelector('.btn-back');
    
    if (backButton) {
        if (screensWithBack.includes(currentScreen)) {
            backButton.style.display = 'flex';
        } else {
            backButton.style.display = 'none';
        }
    }
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
function initApp() {
    console.log('Инициализация приложения...');
    
    const savedUser = localStorage.getItem('fitnesspro_user');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            console.log('Пользователь загружен:', currentUser.name);
            if (currentUser && currentUser.name) {
                showScreen('home');
            } else {
                showScreen('profile-setup');
            }
        } catch (error) {
            console.error('Ошибка при загрузке пользователя:', error);
            showScreen('profile-setup');
        }
    } else {
        console.log('Пользователь не найден, показываем экран настройки');
        showScreen('profile-setup');
    }
    
    const savedDiary = localStorage.getItem('fitnesspro_diary');
    if (savedDiary) {
        try {
            diaryWorkouts = JSON.parse(savedDiary);
            console.log('Дневник загружен, записей:', diaryWorkouts.length);
        } catch (error) {
            console.error('Ошибка при загрузке дневника:', error);
            diaryWorkouts = [];
        }
    }
    
    const savedWater = localStorage.getItem('fitnesspro_water');
    if (savedWater) {
        try {
            waterIntake = parseInt(savedWater) || 0;
        } catch (error) {
            console.error('Ошибка при загрузке водного баланса:', error);
            waterIntake = 0;
        }
    }
    
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        dateElement.textContent = now.toLocaleDateString('ru-RU', options);
    }
    
    console.log('Инициализация завершена');
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен');
    initApp();
});