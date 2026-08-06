"use strict";

/* =========================================================
   ENGLISH 4MS
   CHAPTER 1 ONLY
   Selected English Texts - 4MS / BEM
========================================================= */

let speechRate = Number(
  localStorage.getItem("englishPlusSpeechRate")
) || 1;
const speedBtn =
  document.getElementById("speedBtn");

const speedMenu =
  document.getElementById("speedMenu");



speedBtn.textContent =
  speechRate + "× ▼";

speedBtn.addEventListener("click", () => {

  speedMenu.classList.toggle("hidden");

});

document.querySelectorAll(".speed-item")
  .forEach(item => {

    if (Number(item.dataset.rate) === speechRate) {

      item.classList.add("active");

    }

    item.addEventListener("click", () => {

      speechRate = Number(item.dataset.rate);

      localStorage.setItem(
        "englishPlusSpeechRate",
        speechRate
      );

      speedBtn.textContent =
        speechRate + "× ▼";

      document
        .querySelectorAll(".speed-item")
        .forEach(i =>
          i.classList.remove("active")
        );

      item.classList.add("active");

      speedMenu.classList.add("hidden");

    });

  });

document.addEventListener("click", e => {

  if (!e.target.closest(".speed-selector")) {

    speedMenu.classList.add("hidden");

  }

});


/* =========================================================
   DOM
========================================================= */

const DOM = {
  playAudioBtn:
    document.getElementById("playAudioBtn"),
  
    stopAudioBtn:
    document.getElementById("stopAudioBtn"),
  
    
    app:
        document.getElementById("app"),

    menuBtn:
        document.getElementById("menuBtn"),

    closeMenuBtn:
        document.getElementById("closeMenuBtn"),

    sideMenu:
        document.getElementById("sideMenu"),

    menuOverlay:
        document.getElementById("menuOverlay"),

    searchBtn:
        document.getElementById("searchBtn"),

    searchPanel:
        document.getElementById("searchPanel"),

    searchInput:
        document.getElementById("searchInput"),

    clearSearchBtn:
        document.getElementById("clearSearchBtn"),

    favoritesBtn:
        document.getElementById("favoritesBtn"),

    levelsBtn:
        document.getElementById("levels"),

    levelSection:
        document.querySelector(".level-section"),

    lessonsList:
        document.getElementById("lessonsList"),

    emptyState:
        document.getElementById("emptyState"),

    lessonsTitle:
        document.getElementById("lessonsTitle"),

    lessonsSubtitle:
        document.getElementById("lessonsSubtitle"),

    lessonCount:
        document.getElementById("lessonCount"),

    readerModal:
        document.getElementById("readerModal"),

    modalOverlay:
        document.querySelector(".modal-overlay"),

    closeReaderBtn:
        document.getElementById("closeReaderBtn"),

    readerLevel:
        document.getElementById("readerLevel"),

    readerLessonNumber:
        document.getElementById("readerLessonNumber"),

    readerFavoriteBtn:
        document.getElementById("readerFavoriteBtn"),

    readerTitle:
        document.getElementById("readerTitle"),

    readerTitleAr:
        document.getElementById("readerTitleAr"),

    readerText:
        document.getElementById("readerText"),

    readerTranslation:
        document.getElementById("readerTranslation"),

    vocabularySection:
        document.getElementById("vocabularySection"),

    vocabularyContainer:
        document.getElementById("vocabularyContainer"),

    questionsSection:
        document.getElementById("questionsSection"),

    questionsContainer:
        document.getElementById("questionsContainer"),

    showAnswersBtn:
        document.getElementById("showAnswersBtn"),

    answersContainer:
        document.getElementById("answersContainer"),

    prevLessonBtn:
        document.getElementById("prevLessonBtn"),

    nextLessonBtn:
        document.getElementById("nextLessonBtn"),

    currentPosition:
        document.getElementById("currentPosition"),

    continueMenuBtn:
        document.getElementById("continueMenuBtn"),

    resetProgressBtn:
        document.getElementById("resetProgressBtn"),

    toast:
        document.getElementById("toast"),

    toastMessage:
        document.getElementById("toastMessage"),

    openWebBtn:
        document.getElementById("openWebBtn")

};


/* =========================================================
   CONFIGURATION
========================================================= */

const CONFIG = {

    DATA_FILES: {

        chapter1:
            "chapter1.json"

    },


    STORAGE_KEYS: {

        CHAPTER:
            "english_plus_chapter",

        FAVORITES:
            "english_plus_favorites",

        COMPLETED:
            "english_plus_completed",

        LAST_LESSON:
            "english_plus_last_lesson",

        SPEECH_RATE:
            "englishPlusSpeechRate",

        THEME:
            "englishPlusTheme"

    },


    DEFAULT_CHAPTER:
        "chapter1",


    CHAPTERS: [

        "chapter1"

    ]

};


/* =========================================================
   APPLICATION STATE
========================================================= */

const AppState = {

    data: {

        chapter1:
            null

    },


    currentChapter:
        CONFIG.DEFAULT_CHAPTER,


    currentLessonIndex:
        0,


    currentLesson:
        null,


    searchQuery:
        "",


    showFavoritesOnly:
        false,


    completedOnly:
        false,


    favorites:
        [],


    completed:
        [],


    isSpeaking:
        false

};


/* =========================================================
   SPEECH RATE INITIALIZATION
========================================================= */

const savedSpeechRate =

    localStorage.getItem(
        CONFIG.STORAGE_KEYS.SPEECH_RATE
    ) || "1";


if (speechRate) {

    speechRate = Number(savedSpeechRate);

}





/* =========================================================
   CLOSE SPEECH RATE CONTROL
========================================================= */

document.addEventListener(
    "click",
    (event) => {

        


        

        const clickedSpeakButton =
            event.target.closest(
                "#openWebBtn"
            );


        
    }
);


/* =========================================================
   ANDROID BACK BUTTON
========================================================= */

async function setupAndroidBackButton() {

    try {

        const { App } =
            await import("@capacitor/app");


        App.addListener(
            "backButton",
            () => {

                /* Reader */

                if (
                    DOM.readerModal &&
                    !DOM.readerModal.classList.contains("hidden")
                ) {

                    closeReader();

                    return;

                }


                /* Reset modal */

                if (
                    resetModal &&
                    !resetModal.classList.contains("hidden")
                ) {

                    closeResetModal();

                    return;

                }


                /* Side menu */

                if (
                    DOM.sideMenu &&
                    DOM.sideMenu.classList.contains("open")
                ) {

                    closeMenu();

                    return;

                }


                /* Search */

                if (
                    DOM.searchPanel &&
                    !DOM.searchPanel.classList.contains("hidden")
                ) {

                    DOM.searchPanel.classList.add(
                        "hidden"
                    );


                    DOM.searchBtn?.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    return;

                }


                /* Chapter section */

                if (
                    DOM.levelSection &&
                    !DOM.levelSection.classList.contains("hidden")
                ) {

                    hideChapters();

                    return;

                }


                /* Exit */

                showExitConfirmation();

            }
        );


    } catch (error) {

        console.warn(
            "Capacitor App plugin is not available:",
            error
        );

    }

}


/* =========================================================
   EXIT CONFIRMATION
========================================================= */

async function showExitConfirmation() {

    try {

        const { App } =
            await import("@capacitor/app");


        const confirmed =
            window.confirm(
                "Do you want to exit English 4MS?"
            );


        if (confirmed) {

            await App.exitApp();

        }


    } catch (error) {

        console.warn(
            "Unable to exit application:",
            error
        );

    }

}


/* =========================================================
   RESET MODAL DOM
========================================================= */

const resetModal =
    document.getElementById(
        "resetModal"
    );


const cancelResetBtn =
    document.getElementById(
        "cancelResetBtn"
    );


const confirmResetBtn =
    document.getElementById(
        "confirmResetBtn"
    );


const resetModalOverlay =
    document.getElementById(
        "resetModalOverlay"
    );


/* =========================================================
   THEME
========================================================= */

const themeToggleBtn =
    document.getElementById(
        "themeToggleBtn"
    );


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    init
);


async function init() {

    loadStorage();

    loadTheme();

    bindEvents();

    await setupAndroidBackButton();

    await loadChapter();

    updateThemeButton();

    updateUI();

}


/* =========================================================
   LOAD CHAPTER
========================================================= */

async function loadChapter() {

    try {

        await loadChapterData(
            "chapter1"
        );


        console.log(
            "English 4MS Chapter 1 loaded successfully."
        );


    } catch (error) {

        console.error(
            "Chapter loading error:",
            error
        );


        showDataError();

    }

}


/* =========================================================
   LOAD ONE CHAPTER
========================================================= */

async function loadChapterData(
    chapter
) {

    const file =
        CONFIG.DATA_FILES[
            chapter
        ];


    if (!file) {

        throw new Error(
            `No data file configured for ${chapter}`
        );

    }


    const response =
        await fetch(
            file,
            {
                cache:
                    "no-store"
            }
        );


    if (!response.ok) {

        throw new Error(
            `Failed to load ${file}: ${response.status}`
        );

    }


    const data =
        await response.json();


    AppState.data[
        chapter
    ] =
        normalizeChapterData(
            data,
            chapter
        );

}


/* =========================================================
   NORMALIZE CHAPTER DATA
========================================================= */

function normalizeChapterData(
    data,
    chapter
) {

    /* Direct array */

    if (Array.isArray(data)) {

        return {

            chapter:
                chapter,

            title:
                getChapterTitle(
                    chapter
                ),

            lessons:
                data

        };

    }


    /* Invalid data */

    if (
        !data ||
        typeof data !== "object"
    ) {

        return {

            chapter:
                chapter,

            title:
                getChapterTitle(
                    chapter
                ),

            lessons:
                []

        };

    }


    return {

        chapter:
            data.chapter ||
            chapter,

        title:
            data.title ||
            getChapterTitle(
                chapter
            ),

        lessons:

            Array.isArray(
                data.lessons
            )

                ? data.lessons

                : []

    };

}


/* =========================================================
   STORAGE
========================================================= */

function loadStorage() {

    const savedChapter =
        localStorage.getItem(
            CONFIG.STORAGE_KEYS.CHAPTER
        );


    if (
        savedChapter ===
        "chapter1"
    ) {

        AppState.currentChapter =
            "chapter1";

    }


    AppState.favorites =
        loadArrayFromStorage(
            CONFIG.STORAGE_KEYS.FAVORITES
        );


    AppState.completed =
        loadArrayFromStorage(
            CONFIG.STORAGE_KEYS.COMPLETED
        );

}


/* =========================================================
   LOAD ARRAY FROM STORAGE
========================================================= */

function loadArrayFromStorage(
    key
) {

    try {

        const value =
            JSON.parse(
                localStorage.getItem(
                    key
                )
            );


        if (
            Array.isArray(value)
        ) {

            return value.map(
                String
            );

        }

    } catch (error) {

        console.warn(
            `Invalid storage data: ${key}`,
            error
        );

    }


    return [];

}


/* =========================================================
   SAVE STORAGE
========================================================= */

function saveStorage() {

    localStorage.setItem(
        CONFIG.STORAGE_KEYS.CHAPTER,
        "chapter1"
    );


    localStorage.setItem(
        CONFIG.STORAGE_KEYS.FAVORITES,
        JSON.stringify(
            AppState.favorites
        )
    );


    localStorage.setItem(
        CONFIG.STORAGE_KEYS.COMPLETED,
        JSON.stringify(
            AppState.completed
        )
    );

}


/* =========================================================
   EVENTS
========================================================= */

function bindEvents() {

    /* MENU */

    DOM.menuBtn?.addEventListener(
        "click",
        openMenu
    );


    DOM.closeMenuBtn?.addEventListener(
        "click",
        closeMenu
    );


    DOM.menuOverlay?.addEventListener(
        "click",
        closeMenu
    );


    /* SEARCH */

    DOM.searchBtn?.addEventListener(
        "click",
        toggleSearch
    );


    DOM.searchInput?.addEventListener(
        "input",
        handleSearch
    );


    DOM.clearSearchBtn?.addEventListener(
        "click",
        clearSearch
    );


    /* FAVORITES */

    DOM.favoritesBtn?.addEventListener(
        "click",
        toggleFavorites
    );


    /* CHAPTER */

    DOM.levelsBtn?.addEventListener(
        "click",
        toggleChapters
    );


    DOM.levelSection?.addEventListener(
        "click",
        handleChapterClick
    );


    /* READER */

    DOM.closeReaderBtn?.addEventListener(
        "click",
        closeReader
    );


    DOM.modalOverlay?.addEventListener(
        "click",
        closeReader
    );


    DOM.readerFavoriteBtn?.addEventListener(
        "click",
        toggleCurrentFavorite
    );


    DOM.prevLessonBtn?.addEventListener(
        "click",
        previousLesson
    );


    DOM.nextLessonBtn?.addEventListener(
        "click",
        nextLesson
    );


    


    /* SIDE NAVIGATION */

    document
        .querySelectorAll(
            ".side-nav-item"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    handleSideNavigation
                );

            }
        );


    /* CONTINUE */

    DOM.continueMenuBtn?.addEventListener(
        "click",
        continueLastLesson
    );


    /* RESET */

    DOM.resetProgressBtn?.addEventListener(
        "click",
        resetProgress
    );


    cancelResetBtn?.addEventListener(
        "click",
        closeResetModal
    );


    resetModalOverlay?.addEventListener(
        "click",
        closeResetModal
    );


    confirmResetBtn?.addEventListener(
        "click",
        confirmReset
    );


    /* THEME */

    themeToggleBtn?.addEventListener(
        "click",
        toggleTheme
    );


    /* KEYBOARD */

    document.addEventListener(
        "keydown",
        handleKeyboard
    );
    
    
    
    
    DOM.playAudioBtn?.addEventListener(
      "click",
      speakCurrentLesson
    );
    
    DOM.stopAudioBtn?.addEventListener(
      "click",
      stopSpeech
    );
}


/* =========================================================
   UI UPDATE
========================================================= */

function updateUI() {

    updateActiveChapter();

    updateFavoritesButton();

    renderLessons();

}


/* =========================================================
   CHAPTER MANAGEMENT
========================================================= */

function handleChapterClick(
    event
) {

    const button =
        event.target.closest(
            ".level-btn"
        );


    if (!button) {

        return;

    }


    const chapter =
        button.dataset.chapter ||
        button.dataset.level;


    if (
        chapter !== "chapter1"
    ) {

        return;

    }


    AppState.currentChapter =
        "chapter1";


    AppState.searchQuery =
        "";


    AppState.showFavoritesOnly =
        false;


    if (DOM.searchInput) {

        DOM.searchInput.value =
            "";

    }


    saveStorage();

    updateActiveChapter();

    renderLessons();

    hideChapters();

}


/* =========================================================
   UPDATE ACTIVE CHAPTER
========================================================= */

function updateActiveChapter() {

    document
        .querySelectorAll(
            ".level-btn"
        )
        .forEach(
            button => {

                const buttonChapter =
                    button.dataset.chapter ||
                    button.dataset.level;


                const active =
                    buttonChapter ===
                    "chapter1";


                button.classList.toggle(
                    "active",
                    active
                );


                button.setAttribute(
                    "aria-selected",
                    String(active)
                );

            }
        );


    if (
        DOM.lessonsTitle &&
        !AppState.showFavoritesOnly
    ) {

        DOM.lessonsTitle.textContent =
            "نصوص الفصل الأول";

    }

}


/* =========================================================
   CHAPTER VISIBILITY
========================================================= */

function toggleChapters() {

    const isHidden =
        DOM.levelSection?.classList.contains(
            "hidden"
        );


    if (isHidden) {

        showChapters();

    } else {

        hideChapters();

    }

}


function showChapters() {

    DOM.levelSection?.classList.remove(
        "hidden"
    );


    DOM.levelsBtn?.setAttribute(
        "aria-pressed",
        "true"
    );

}


function hideChapters() {

    DOM.levelSection?.classList.add(
        "hidden"
    );


    DOM.levelsBtn?.setAttribute(
        "aria-pressed",
        "false"
    );

}


/* =========================================================
   CURRENT CHAPTER
========================================================= */

function getCurrentChapterData() {

    return (

        AppState.data.chapter1 || {

            chapter:
                "chapter1",

            title:
                "الفصل الأول",

            lessons:
                []

        }

    );

}


function getCurrentChapterLessons() {

    const chapterData =
        getCurrentChapterData();


    return Array.isArray(
        chapterData.lessons
    )
        ? chapterData.lessons
        : [];

}


function getCurrentChapterTitle() {

    return "نصوص الفصل الأول";

}


/* =========================================================
   FILTER TEXTS
========================================================= */

function getVisibleLessons() {

    let lessons =
        getCurrentChapterLessons();


    /* SEARCH */

    if (
        AppState.searchQuery.trim()
    ) {

        const query =
            AppState.searchQuery
                .toLowerCase()
                .trim();


        lessons =
            lessons.filter(
                lesson => {

                    const title =
                        String(
                            lesson.title ||
                            ""
                        ).toLowerCase();


                    const titleAr =
                        String(
                            lesson.title_ar ||
                            ""
                        ).toLowerCase();


                    const content =
                        String(
                            lesson.content ||
                            ""
                        ).toLowerCase();


                    const translation =
                        String(
                            lesson.translation_ar ||
                            ""
                        ).toLowerCase();


                    return (

                        title.includes(query) ||

                        titleAr.includes(query) ||

                        content.includes(query) ||

                        translation.includes(query)

                    );

                }
            );

    }


    /* FAVORITES */

    if (
        AppState.showFavoritesOnly
    ) {

        lessons =
            lessons.filter(
                (lesson, index) =>
                    isFavorite(
                        getLessonId(
                            lesson,
                            index
                        )
                    )
            );

    }


    return lessons;

}


/* =========================================================
   RENDER TEXTS
========================================================= */

function renderLessons() {

    const lessons =
        getVisibleLessons();


    updateLessonsHeader(
        lessons.length
    );


    if (
        lessons.length === 0
    ) {

        if (DOM.lessonsList) {

            DOM.lessonsList.innerHTML =
                "";

        }


        DOM.emptyState?.classList.remove(
            "hidden"
        );


        return;

    }


    DOM.emptyState?.classList.add(
        "hidden"
    );


    if (DOM.lessonsList) {

        DOM.lessonsList.innerHTML =

            lessons
                .map(
                    (lesson, index) =>
                        createLessonCard(
                            lesson,
                            index
                        )
                )
                .join("");

    }


    attachLessonEvents();

}


/* =========================================================
   TEXT HEADER
========================================================= */

function updateLessonsHeader(
    count
) {

    if (
        AppState.showFavoritesOnly
    ) {

        DOM.lessonsTitle.textContent =
            "النصوص المفضلة";


        DOM.lessonsSubtitle.textContent =
            "النصوص التي حفظتها في المفضلة.";

    } else {

        DOM.lessonsTitle.textContent =
            "نصوص الفصل الأول";


        DOM.lessonsSubtitle.textContent =
            "نصوص إنجليزية مختارة بعناية لتلاميذ السنة الرابعة متوسط، للتحضير لشهادة التعليم المتوسط وتطوير مهارات القراءة والفهم والمفردات.";

    }


    DOM.lessonCount.textContent =
        `${count} ${
            count === 1
                ? "نص"
                : "نص"
        }`;

}


/* =========================================================
   TEXT CARD
========================================================= */

function createLessonCard(
    lesson,
    index
)
{

    const id =
        getLessonId(
            lesson,
            index
        );


    const completed =
        isCompleted(id);


    const favorite =
        isFavorite(id);


    return `

        <article

            class="
                lesson-card
                ${completed ? "completed" : ""}
                ${favorite ? "is-favorite" : ""}
            "

            data-lesson-id="${escapeAttribute(id)}"

            tabindex="0"

            role="button"

            aria-label="${escapeAttribute(
                lesson.title ||
                "فتح النص"
            )}"

        >

            <div class="lesson-number">

                ${String(
                    index + 1
                ).padStart(
                    2,
                    "0"
                )}

            </div>


            <div class="lesson-info">

                <h3>

                    ${escapeHTML(
                        lesson.title ||
                        "عنوان النص"
                    )}

                </h3>


                <p>

                    ${escapeHTML(
                        lesson.title_ar ||
                        ""
                    )}

                </p>

            </div>


            <div class="lesson-status">

                ${
                    completed
                        ? "✓"
                        : ""
                }

            </div>


       <div class="lesson-favorite">
       
           ${
               favorite
                   ? '<span class="blue-star">★</span>'
                   : ""
           }
       
       </div>

        </article>

    `;

}


/* =========================================================
   TEXT EVENTS
========================================================= */

function attachLessonEvents() {

    document
        .querySelectorAll(
            ".lesson-card"
        )
        .forEach(
            card => {

                card.addEventListener(
                    "click",
                    () => {

                        openLesson(
                            card.dataset.lessonId
                        );

                    }
                );


                card.addEventListener(
                    "keydown",
                    event => {

                        if (
                            event.key === "Enter" ||
                            event.key === " "
                        ) {

                            event.preventDefault();


                            openLesson(
                                card.dataset.lessonId
                            );

                        }

                    }
                );

            }
        );

}


/* =========================================================
   OPEN TEXT
========================================================= */

function openLesson(
    lessonId
) {

    const lessons =
        getCurrentChapterLessons();


    const index =
        lessons.findIndex(
            (lesson, lessonIndex) =>
                getLessonId(
                    lesson,
                    lessonIndex
                ) ===
                String(lessonId)
        );


    if (
        index === -1
    ) {

        return;

    }


    AppState.currentLessonIndex =
        index;


    AppState.currentLesson =
        lessons[index];


    renderReader();


    DOM.readerModal?.classList.remove(
        "hidden"
    );


    document.body.style.overflow =
        "hidden";


    saveLastLesson(
        getLessonId(
            AppState.currentLesson,
            AppState.currentLessonIndex
        )
    );

}


/* =========================================================
   RENDER READER
========================================================= */

function renderReader() {

    const lesson =
        AppState.currentLesson;


    if (!lesson) {

        return;

    }


    const lessons =
        getCurrentChapterLessons();


    const index =
        AppState.currentLessonIndex;


    /* TITLE COLORS */

    const titleColors = [


        
            "#4298e8",
            "#3eb27d",
            "#dba72d",
            "#e27e38",
            "#dc679a",
            "#8060d7"
        
        

    ];


    const titleColor =
        titleColors[
            index %
            titleColors.length
        ];


    /* HEADER */

    if (DOM.readerLevel) {

        DOM.readerLevel.textContent =
            "الفصل الأول";

    }


    if (DOM.readerLessonNumber) {

        DOM.readerLessonNumber.textContent =
            `النص ${index + 1}`;

    }


    /* ENGLISH TITLE */

    if (DOM.readerTitle) {

        DOM.readerTitle.textContent =
            lesson.title ||
            "عنوان النص";


        DOM.readerTitle.style.setProperty(
            "--title-color",
            titleColor
        );

    }


    /* ARABIC TITLE */

    if (DOM.readerTitleAr) {

        DOM.readerTitleAr.textContent =
            lesson.title_ar ||
            "";


        DOM.readerTitleAr.style.setProperty(
            "--title-color",
            titleColor
        );

    }


    /* ENGLISH TEXT */

    if (DOM.readerText) {

        DOM.readerText.textContent =
            lesson.content ||
            "";

    }


    /* ARABIC TRANSLATION */

    if (DOM.readerTranslation) {

        DOM.readerTranslation.textContent =
            lesson.translation_ar ||
            "لا توجد ترجمة متوفرة.";

    }


    /* VOCABULARY */

    renderVocabulary();


    /* FAVORITE */

    updateReaderFavoriteButton();


    /* QUESTIONS */

    renderQuestions();


    /* NAVIGATION */

    updateReaderNavigation(
        lessons.length
    );


    /* COMPLETED */

    markAsCompleted(
        getLessonId(
            lesson,
            index
        )
    );

}


/* =========================================================
   GET TEXT ID
========================================================= */

function getLessonId(
    lesson,
    index
) {

    return String(

        lesson?.id ??
        `chapter1_${index}`

    );

}


/* =========================================================
   VOCABULARY
========================================================= */

function renderVocabulary() {

    const lesson =
        AppState.currentLesson;


    if (
        !DOM.vocabularySection ||
        !DOM.vocabularyContainer
    ) {

        return;

    }


    const vocabulary =
        lesson?.vocabulary ||
        lesson?.words ||
        [];


    if (
        !Array.isArray(vocabulary) ||
        vocabulary.length === 0
    ) {

        DOM.vocabularySection.classList.add(
            "hidden"
        );


        DOM.vocabularyContainer.innerHTML =
            "";


        return;

    }


    DOM.vocabularySection.classList.remove(
        "hidden"
    );


    DOM.vocabularyContainer.innerHTML =

        vocabulary
            .map(
                item => {

                    if (
                        typeof item === "string"
                    ) {

                        return `

                            <div class="vocabulary-item">

                                ${escapeHTML(item)}

                            </div>

                        `;

                    }


                    const word =
                        item.word ||
                        item.term ||
                        "";


                    const translation =
                        item.translation_ar ||
                        item.arabic ||
                        item.meaning ||
                        "";


                    const english =
                        item.translation_en ||
                        "";


                    return `

                        <div class="vocabulary-item">

                            <strong>

                                ${escapeHTML(word)}

                            </strong>


                            ${
                                translation
                                    ? `
                                        <span>
                                            ${escapeHTML(translation)}
                                        </span>
                                      `
                                    : ""
                            }


                            ${
                                english
                                    ? `
                                        <small>
                                            ${escapeHTML(english)}
                                        </small>
                                      `
                                    : ""
                            }

                        </div>

                    `;

                }
            )
            .join("");

}


/* =========================================================
   QUESTIONS
========================================================= */

function renderQuestions() {

    const lesson =
        AppState.currentLesson;


    const questions =
        Array.isArray(
            lesson?.questions
        )
            ? lesson.questions
            : [];


    if (
        DOM.answersContainer
    ) {

        DOM.answersContainer.classList.add(
            "hidden"
        );


        DOM.answersContainer.innerHTML =
            "";

    }


    if (
        questions.length === 0
    ) {

        if (DOM.questionsSection) {

            DOM.questionsSection.classList.add(
                "hidden"
            );

        }


        return;

    }


    if (DOM.questionsSection) {

        DOM.questionsSection.classList.remove(
            "hidden"
        );

    }


    if (!DOM.questionsContainer) {

        return;

    }


    DOM.questionsContainer.innerHTML =

        questions
            .map(
                (question, index) => {

                    const text =
                        typeof question === "string"
                            ? question
                            : question?.question || "";


                    const answer =
                        typeof question === "string"
                            ? ""
                            : question?.answer || "";


                    return `

                        <div
                            class="question-card"
                            data-index="${index}"
                        >

                            <div
                                class="question-header"
                                tabindex="0"
                                role="button"
                                aria-expanded="false"
                            >

                                <span class="question-number">

                                    Question ${index + 1}

                                </span>


                                <div
                                    class="question-text"
                                    dir="ltr"
                                >

                                    ${escapeHTML(text)}

                                </div>

                            </div>


                            <div
                                class="user-answer-section"
                                dir="ltr"
                            >

                                <label>

                                    Your Answer

                                </label>


                                <textarea
                                    class="user-answer-input"
                                    placeholder="Write your answer here..."
                                    rows="3"
                                    spellcheck="true"
                                ></textarea>

                            </div>


                            <div
                                class="question-answer hidden"
                                dir="ltr"
                            >

                                ${escapeHTML(answer)}

                            </div>

                        </div>

                    `;

                }
            )
            .join("");


    DOM.questionsContainer
        .querySelectorAll(
            ".question-header"
        )
        .forEach(
            header => {

                header.addEventListener(
                    "click",
                    () => {

                        const card =
                            header.closest(
                                ".question-card"
                            );


                        const answer =
                            card?.querySelector(
                                ".question-answer"
                            );


                        if (!answer) {

                            return;

                        }


                        const isHidden =
                            answer.classList.contains(
                                "hidden"
                            );


                        answer.classList.toggle(
                            "hidden",
                            !isHidden
                        );


                        header.setAttribute(
                            "aria-expanded",
                            String(isHidden)
                        );


                        card.classList.toggle(
                            "has-answer",
                            isHidden
                        );

                    }
                );


                header.addEventListener(
                    "keydown",
                    event => {

                        if (
                            event.key === "Enter" ||
                            event.key === " "
                        ) {

                            event.preventDefault();

                            header.click();

                        }

                    }
                );

            }
        );

}


/* =========================================================
   READER NAVIGATION
========================================================= */

function updateReaderNavigation(
    totalLessons
) {

    if (DOM.currentPosition) {

        DOM.currentPosition.textContent =
            `${AppState.currentLessonIndex + 1} / ${totalLessons}`;

    }


    if (DOM.prevLessonBtn) {

        DOM.prevLessonBtn.disabled =
            AppState.currentLessonIndex <= 0;

    }


    if (DOM.nextLessonBtn) {

        DOM.nextLessonBtn.disabled =
            AppState.currentLessonIndex >=
            totalLessons - 1;

    }

}


function previousLesson() {

    if (
        AppState.currentLessonIndex <= 0
    ) {

        return;

    }


    AppState.currentLessonIndex--;


    const lessons =
        getCurrentChapterLessons();


    AppState.currentLesson =
        lessons[
            AppState.currentLessonIndex
        ];


    saveLastLesson(
        getLessonId(
            AppState.currentLesson,
            AppState.currentLessonIndex
        )
    );


    renderReader();

}


function nextLesson() {

    const lessons =
        getCurrentChapterLessons();


    if (
        AppState.currentLessonIndex >=
        lessons.length - 1
    ) {

        return;

    }


    AppState.currentLessonIndex++;


    AppState.currentLesson =
        lessons[
            AppState.currentLessonIndex
        ];


    saveLastLesson(
        getLessonId(
            AppState.currentLesson,
            AppState.currentLessonIndex
        )
    );


    renderReader();

}


/* =========================================================
   CLOSE READER
========================================================= */

function closeReader() {

    stopSpeech();


    DOM.readerModal?.classList.add(
        "hidden"
    );


    document.body.style.overflow =
        "";

}


/* =========================================================
   FAVORITES
========================================================= */

function isFavorite(
    lessonId
) {

    return AppState.favorites.includes(
        String(lessonId)
    );

}


function toggleFavorite(
    lessonId
) {

    const id =
        String(lessonId);


    if (
        isFavorite(id)
    ) {

        AppState.favorites =
            AppState.favorites.filter(
                item =>
                    item !== id
            );


        showToast(
            "تمت إزالة النص من المفضلة"
        );

    } else {

        AppState.favorites.push(
            id
        );


        showToast(
            "تمت إضافة النص إلى المفضلة ☆"
        );

    }


    saveStorage();

    updateFavoritesButton();

    updateReaderFavoriteButton();

    renderLessons();

}


function toggleCurrentFavorite() {

    if (
        !AppState.currentLesson
    ) {

        return;

    }


    toggleFavorite(
        getLessonId(
            AppState.currentLesson,
            AppState.currentLessonIndex
        )
    );

}


function updateReaderFavoriteButton() {

    if (
        !AppState.currentLesson ||
        !DOM.readerFavoriteBtn
    ) {

        return;

    }


    const favorite =
        isFavorite(
            getLessonId(
                AppState.currentLesson,
                AppState.currentLessonIndex
            )
        );


    DOM.readerFavoriteBtn.textContent =
  favorite ? "★" : "☆";

DOM.readerFavoriteBtn.style.color =
  "#3B82F6";

    DOM.readerFavoriteBtn.setAttribute(
        "aria-pressed",
        String(favorite)
    );


    DOM.readerFavoriteBtn.setAttribute(
        "aria-label",
        favorite
            ? "إزالة النص من المفضلة"
            : "إضافة النص إلى المفضلة"
    );

}


function toggleFavorites() {

    AppState.showFavoritesOnly =
        !AppState.showFavoritesOnly;


    AppState.searchQuery =
        "";


    if (DOM.searchInput) {

        DOM.searchInput.value =
            "";

    }


    updateFavoritesButton();

    renderLessons();

}


function updateFavoritesButton() {

    const active =
        AppState.showFavoritesOnly;


    if (!DOM.favoritesBtn) {

        return;

    }


    DOM.favoritesBtn.textContent =
        active
            ? " ★"
            : "☆";


    DOM.favoritesBtn.setAttribute(
        "aria-pressed",
        String(active)
    );

}


/* =========================================================
   COMPLETED TEXTS
========================================================= */

function isCompleted(
    lessonId
) {

    return AppState.completed.includes(
        String(lessonId)
    );

}


function markAsCompleted(
    lessonId
) {

    const id =
        String(lessonId);


    if (
        isCompleted(id)
    ) {

        return;

    }


    AppState.completed.push(
        id
    );


    saveStorage();

}


/* =========================================================
   SEARCH
========================================================= */

function toggleSearch() {

    if (!DOM.searchPanel) {

        return;

    }


    const hidden =
        DOM.searchPanel.classList.contains(
            "hidden"
        );


    DOM.searchPanel.classList.toggle(
        "hidden",
        !hidden
    );


    DOM.searchBtn?.setAttribute(
        "aria-expanded",
        String(hidden)
    );


    if (hidden) {

        DOM.searchInput?.focus();

    }

}


function handleSearch(
    event
) {

    AppState.searchQuery =
        event.target.value;


    AppState.showFavoritesOnly =
        false;


    updateFavoritesButton();

    renderLessons();

}


function clearSearch() {

    if (DOM.searchInput) {

        DOM.searchInput.value =
            "";

    }


    AppState.searchQuery =
        "";


    renderLessons();

}


/* =========================================================
   TEXT TO SPEECH
========================================================= */

function speakCurrentLesson() {

  if (!AppState.currentLesson) return;

  if (!("speechSynthesis" in window)) {

    showToast("القراءة الصوتية غير مدعومة.");

    return;

  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(
    AppState.currentLesson.content || ""
  );

  utterance.lang = "en-US";

  utterance.rate = speechRate;

  utterance.pitch = 1;

  utterance.volume = 1;

  utterance.onstart = () => {

    AppState.isSpeaking = true;

  };

  utterance.onend = () => {

    AppState.isSpeaking = false;

  };

  utterance.onerror = () => {

    AppState.isSpeaking = false;

  };

  window.speechSynthesis.speak(utterance);

}

function stopSpeech() {

  if ("speechSynthesis" in window) {

    window.speechSynthesis.cancel();

  }

  AppState.isSpeaking = false;

}

/* =========================================================
   OPEN CURRENT TEXT ON WEB
========================================================= */

function openCurrentLessonOnWeb() {

    if (
        !AppState.currentLesson
    ) {

        window.open(
            "https://alaska-sahari.github.io/English-4MS-/",
            "_blank"
        );

        return;

    }


    const lessonId =
        getLessonId(
            AppState.currentLesson,
            AppState.currentLessonIndex
        );


    const chapter =
        "chapter1";


    const url =
        "https://alaska-sahari.github.io/English-4MS-/" +
        `?chapter=${encodeURIComponent(chapter)}` +
        `&lesson=${encodeURIComponent(lessonId)}`;


    window.open(
        url,
        "_blank"
    );

}




/* =========================================================
   SIDE MENU
========================================================= */

function openMenu() {

    DOM.sideMenu?.classList.add(
        "open"
    );


    DOM.menuOverlay?.classList.add(
        "open"
    );


    DOM.menuBtn?.setAttribute(
        "aria-expanded",
        "true"
    );

}


function closeMenu() {

    DOM.sideMenu?.classList.remove(
        "open"
    );


    DOM.menuOverlay?.classList.remove(
        "open"
    );


    DOM.menuBtn?.setAttribute(
        "aria-expanded",
        "false"
    );

}


/* =========================================================
   SIDE NAVIGATION
========================================================= */

function handleSideNavigation(
    event
) {

    const button =
        event.currentTarget;


    const view =
        button.dataset.view;


    document
        .querySelectorAll(
            ".side-nav-item"
        )
        .forEach(
            item => {

                item.classList.remove(
                    "active"
                );


                item.removeAttribute(
                    "aria-current"
                );

            }
        );


    button.classList.add(
        "active"
    );


    button.setAttribute(
        "aria-current",
        "page"
    );


    if (
        view === "favorites"
    ) {

        AppState.showFavoritesOnly =
            true;


        AppState.completedOnly =
            false;

    }


    if (
        view === "lessons"
    ) {

        AppState.showFavoritesOnly =
            false;


        AppState.completedOnly =
            false;

    }


    if (
        view === "progress"
    ) {

        AppState.showFavoritesOnly =
            false;


        AppState.completedOnly =
            false;


        showProgressInfo();

    }


    updateFavoritesButton();

    renderLessons();

    closeMenu();

}


/* =========================================================
   PROGRESS
========================================================= */

function showProgressInfo() {

    const total =
        getTotalLessons();


    const completed =
        getCurrentChapterLessons()
            .filter(
                (lesson, index) =>
                    isCompleted(
                        getLessonId(
                            lesson,
                            index
                        )
                    )
            )
            .length;


    const percentage =
        total > 0
            ? Math.round(
                (
                    completed /
                    total
                ) * 100
            )
            : 0;


    showToast(
        `تقدمك: ${completed} / ${total} (${percentage}%)`
    );

}


function getTotalLessons() {

    return getCurrentChapterLessons()
        .length;

}


/* =========================================================
   CONTINUE LAST TEXT
========================================================= */

function continueLastLesson() {

    const lastLessonId =
        localStorage.getItem(
            CONFIG.STORAGE_KEYS.LAST_LESSON
        );


    if (
        !lastLessonId
    ) {

        showToast(
            "لا يوجد نص سابق للمتابعة."
        );


        closeMenu();

        return;

    }


    const lessons =
        getCurrentChapterLessons();


    const index =
        lessons.findIndex(
            (lesson, lessonIndex) =>
                getLessonId(
                    lesson,
                    lessonIndex
                ) ===
                String(lastLessonId)
        );


    if (
        index === -1
    ) {

        showToast(
            "تعذر العثور على النص السابق."
        );


        closeMenu();

        return;

    }


    AppState.currentChapter =
        "chapter1";


    AppState.currentLessonIndex =
        index;


    AppState.currentLesson =
        lessons[index];


    AppState.showFavoritesOnly =
        false;


    saveStorage();

    updateActiveChapter();

    renderLessons();

    renderReader();


    DOM.readerModal?.classList.remove(
        "hidden"
    );


    document.body.style.overflow =
        "hidden";


    closeMenu();

}


/* =========================================================
   SAVE LAST TEXT
========================================================= */

function saveLastLesson(
    lessonId
) {

    localStorage.setItem(
        CONFIG.STORAGE_KEYS.LAST_LESSON,
        String(lessonId)
    );


    localStorage.setItem(
        CONFIG.STORAGE_KEYS.CHAPTER,
        "chapter1"
    );

}


/* =========================================================
   RESET PROGRESS
========================================================= */

function resetProgress() {

    openResetModal();

}


function openResetModal() {

    resetModal?.classList.remove(
        "hidden"
    );

}


function closeResetModal() {

    resetModal?.classList.add(
        "hidden"
    );

}


function confirmReset() {

    AppState.completed =
        [];


    localStorage.removeItem(
        CONFIG.STORAGE_KEYS.COMPLETED
    );


    saveStorage();

    renderLessons();

    closeResetModal();


    showToast(
        "تمت إعادة ضبط التقدم."
    );

}


/* =========================================================
   KEYBOARD
========================================================= */

function handleKeyboard(
    event
) {

    if (
        event.key === "Escape"
    ) {

        if (
            DOM.readerModal &&
            !DOM.readerModal.classList.contains("hidden")
        ) {

            closeReader();

            return;

        }


        if (
            resetModal &&
            !resetModal.classList.contains("hidden")
        ) {

            closeResetModal();

            return;

        }


        closeMenu();

    }


    if (
        DOM.readerModal?.classList.contains(
            "hidden"
        )
    ) {

        return;

    }


    if (
        event.key === "ArrowLeft"
    ) {

        previousLesson();

    }


    if (
        event.key === "ArrowRight"
    ) {

        nextLesson();

    }

}


/* =========================================================
   SWIPE NAVIGATION — MOBILE
========================================================= */

let touchStartX =
    0;


let touchStartY =
    0;


document.addEventListener(
    "touchstart",
    event => {

        if (
            !DOM.readerModal ||
            DOM.readerModal.classList.contains("hidden")
        ) {

            return;

        }


        const touch =
            event.changedTouches[0];


        touchStartX =
            touch.clientX;


        touchStartY =
            touch.clientY;

    },
    {
        passive: true
    }
);


document.addEventListener(
    "touchend",
    event => {

        if (
            !DOM.readerModal ||
            DOM.readerModal.classList.contains("hidden")
        ) {

            return;

        }


        const touch =
            event.changedTouches[0];


        const touchEndX =
            touch.clientX;


        const touchEndY =
            touch.clientY;


        const deltaX =
            touchEndX -
            touchStartX;


        const deltaY =
            touchEndY -
            touchStartY;


        if (
            Math.abs(deltaY) >
            Math.abs(deltaX)
        ) {

            return;

        }


        const SWIPE_THRESHOLD =
            60;


        if (
            Math.abs(deltaX) <
            SWIPE_THRESHOLD
        ) {

            return;

        }


        if (
            deltaX < 0
        ) {

            previousLesson();

        } else {

            nextLesson();

        }

    },
    {
        passive: true
    }
);


/* =========================================================
   THEME
========================================================= */

function loadTheme() {

    const savedTheme =
        localStorage.getItem(
            CONFIG.STORAGE_KEYS.THEME
        );


    document.documentElement.dataset.theme =
        savedTheme || "light";

}


function toggleTheme() {

    const currentTheme =
        document.documentElement.dataset.theme;


    const newTheme =
        currentTheme === "dark"
            ? "light"
            : "dark";


    document.documentElement.dataset.theme =
        newTheme;


    localStorage.setItem(
        CONFIG.STORAGE_KEYS.THEME,
        newTheme
    );


    updateThemeButton();

}


function updateThemeButton() {

    if (
        !themeToggleBtn
    ) {

        return;

    }


    const theme =
        document.documentElement.dataset.theme;


    const icon =
        themeToggleBtn.querySelector(
            "span:first-child"
        );


    const text =
        themeToggleBtn.querySelector(
            "span:last-child"
        );


    if (icon) {

        icon.textContent =
            theme === "dark"
                ? "☀️"
                : "🌙";

    }


    if (text) {

        text.textContent =
            theme === "dark"
                ? "الوضع النهاري"
                : "الوضع الليلي";

    }

}


/* =========================================================
   CHAPTER TITLE
========================================================= */

function getChapterTitle(
    chapter
) {

    return "الفصل الأول";

}


/* =========================================================
   CHAPTER DESCRIPTION
========================================================= */

function getChapterDescription(
    chapter
) {

    return "نصوص إنجليزية مختارة بعناية للتحضير لشهادة التعليم المتوسط وتطوير مهارات القراءة والفهم والمفردات.";

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer =
    null;


function showToast(
    message
) {

    if (
        !DOM.toast ||
        !DOM.toastMessage
    ) {

        return;

    }


    DOM.toastMessage.textContent =
        message;


    DOM.toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                DOM.toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =========================================================
   DATA ERROR
========================================================= */

function showDataError() {

    if (
        !DOM.lessonsList
    ) {

        return;

    }


    DOM.lessonsList.innerHTML =

        `

            <div class="empty-state">

                <div class="empty-icon">
                    ⚠️
                </div>


                <h3>
                    تعذر تحميل النصوص
                </h3>


                <p>
                    تأكد من وجود الملف
                    <strong>
                        chapter1.json
                    </strong>
                    بجانب ملف HTML.
                </p>

            </div>

        `;

}


/* =========================================================
   SECURITY HELPERS
========================================================= */

function escapeHTML(
    value
) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


function escapeAttribute(
    value
) {

    return escapeHTML(
        value
    );

}


/* =========================================================
   END
========================================================= */

console.log(
    "English 4MS — Chapter 1 loaded successfully."
);