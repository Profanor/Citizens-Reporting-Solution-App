/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

// Get the button and the additional links container
const additionalLinksBtn = document.getElementById("additionalLinksBtn");
const additionalLinksContainer = document.getElementById("additionalLinksContainer");

// Add event listener to the button
additionalLinksBtn.addEventListener("click", function() {
    // Toggle the visibility of the additional links container
    additionalLinksContainer.classList.toggle("show");
});

//carousel slider
document.addEventListener('DOMContentLoaded', function () {
    let currentIndex = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    
    // Show the initial slide
    showSlide(currentIndex);

    function showSlide(index) {
        // Hide all slides
        slides.forEach((slide) => {
            slide.style.display = 'none';
        });

        // Show the selected slide
        slides[index].style.display = 'block';
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }
    function startCarousel() {
        setInterval(nextSlide, 5000);
    }
    startCarousel();
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    // Event listeners for next and previous buttons
    document.getElementById('nextBtn').addEventListener('click', nextSlide);
    document.getElementById('prevBtn').addEventListener('click', prevSlide);
});