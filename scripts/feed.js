
//this the javascriipt that allows the feed to update based on the sliders//
(function () {
    const feed = document.getElementById('mood-feed');
    const sliders = Array.from(document.querySelectorAll('.mood-slider'));

    if (!feed || sliders.length === 0) {
        return;
    }

    const cards = Array.from(feed.children);
    const summaryEl = document.getElementById('mood-summary');

    function formatList(parts) {
        if (parts.length === 0) {
            return '';
        }
        if (parts.length === 1) {
            return parts[0];
        }
        const last = parts.pop();
        return `${parts.join(', ')} and ${last}`;
    }

    function updateSliderValue(slider) {
        const valueDisplay = document.getElementById(`${slider.id}-value`);
        if (valueDisplay) {
            valueDisplay.textContent = slider.value;
        }
    }

    function describeMood() {
        if (!summaryEl) {
            return;
        }
        const happy = Number(document.getElementById('mood-happy')?.value ?? 0);
        const energy = Number(document.getElementById('mood-energy')?.value ?? 0);
        const rotting = Number(document.getElementById('mood-rotting')?.value ?? 0);

        const descriptors = [];

        if (happy > 65) {
            descriptors.push('uplifting moments');
        } else if (happy < 35) {
            descriptors.push('grounding reflections');
        } else {
            descriptors.push('balanced moods');
        }

        if (energy > 65) {
            descriptors.push('high-stress moments');
        } else if (energy < 35) {
            descriptors.push('slow living vibes');
        } else {
            descriptors.push('steady routines');
        }

        if (rotting > 65) {
            descriptors.push('thought-provoking finds');
        } else if (rotting < 35) {
            descriptors.push('comforting familiar scenes');
        } else {
            descriptors.push('a mix of inspiration');
        }

        summaryEl.textContent = `Your feed is leaning toward ${formatList(descriptors)}.`;
    }

    function computeScores() {
        return cards.map((card) => {
            let difference = 0;

            sliders.forEach((slider) => {
                const trait = slider.dataset.trait;
                const sliderValue = Number(slider.value);
                const cardValue = Number(card.dataset[trait]);

                if (!Number.isNaN(cardValue)) {
                    difference += Math.abs(sliderValue - cardValue);
                }
            });

            const averageDifference = difference / sliders.length;
            const match = Math.max(0, Math.round(100 - averageDifference));

            return { card, difference, match };
        }).sort((a, b) => a.difference - b.difference);
    }

    function updateFeed() {
        const scoredCards = computeScores();

        cards.forEach((card) => card.classList.remove('feed-card--featured'));

        scoredCards.forEach((entry, index) => {
            const { card, match } = entry;
            feed.appendChild(card);

            const matchLabel = card.querySelector('.feed-card__match');
            if (matchLabel) {
                matchLabel.textContent = `Vibe match ${match}%`;
            }

            if (index === 0) {
                card.classList.add('feed-card--featured');
            }
        });
    }

    sliders.forEach((slider) => {
        updateSliderValue(slider);
        slider.addEventListener('input', () => {
            updateSliderValue(slider);
            describeMood();
            updateFeed();
        });
    });

    describeMood();
    updateFeed();
})();
