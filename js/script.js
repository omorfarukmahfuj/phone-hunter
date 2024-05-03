const loadPhone = async (searchText = '13', isShowAll) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await response.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
  // 1. Get the container
  const phoneContainer = document.getElementById('phone-container');

  // Clear container
  phoneContainer.textContent = ``;

  // Display Show All button
  const showAllContainer = document.getElementById('show-all-container');
  if (phones.length > 6 && !isShowAll) {
    showAllContainer.classList.remove('hidden');
  } else {
    showAllContainer.classList.add('hidden');
  }

  // Handling Phones Result
  if (!isShowAll) {
    phones = phones.slice(0, 6);
  }

  phones.forEach(phone => {
    // 2. Create a div
    const phoneCard = document.createElement('div');
    phoneCard.classList = `border border-[#CFCFCF] rounded-md p-5 flex flex-col items-center`;
    // 3. Set innerHTML
    phoneCard.innerHTML = `
    <div class="bg-[#0D6EFD0D] rounded-md w-full flex justify-center items-center">
      <img class="h-3/4" src="${phone.image}">
    </div>
    <h3 class="text-xl font-bold mt-5 mb-4 text-center text-[#3f3f40]">${phone.phone_name}</h3>
    <p class="text-sm mb-[6px] text-center text-[#706F6F]">There are many variations of passages of available, but the majority have suffered</p>
    <p class="text-xl font-bold mb-3 text-center text-[#3f3f40]">$999</p>
    <button onclick = "handleShowDetails('${phone.slug}')" class="btn px-8 bg-[#0D6EFD] hover:bg-[#0a58ca] text-white text-base">Show Details</button>
    `;
    // 4. Append child
    phoneContainer.appendChild(phoneCard);
  })

  // Hide Loading Spinner
  toggleSpinner(false);
}

// Handle Search Button
const handleSearch = (isShowAll) => {
  toggleSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
}

// Loading Spinner
const toggleSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if (isLoading) {
    loadingSpinner.classList.remove = 'hidden';
  }
  else {
    loadingSpinner.classList.add('hidden');
  }
}

// Handle Show All
const handleShowAll = () => {
  handleSearch(true);
}

// Handle Show Details
const handleShowDetails = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;

  showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
  console.log(phone);
  show_details_modal.showModal();
  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML = `
  <div class="bg-[#0D6EFD0D] rounded-md flex justify-center p-3 md:py-10 md:px-40 mb-4 md:mb-8">
  <img src="${phone.image}">
</div>
<h4 class="text-[#403F3F] text-2xl font-bold mb-5">${phone.name}</h4>
<p class="text-[#706F6F] text-xs mb-4 leading-5">It is a long established fact that a reader will be
  distracted by
  the readable
  content of a page when looking at its layout.</p>
<p class="text-base text-[#706F6F] mb-3"><strong class="text-[#403F3F]">Storage : </strong>${phone?.mainFeatures?.storage}</p>
<p class="text-base text-[#706F6F] mb-3"><strong class="text-[#403F3F]">Display Size : </strong>${phone?.mainFeatures?.displaySize}
</p>
<p class="text-base text-[#706F6F] mb-3"><strong class="text-[#403F3F]">Chipset : </strong>${phone?.mainFeatures?.chipSet}
</p>
<p class="text-base text-[#706F6F] mb-3"><strong class="text-[#403F3F]">Memory : </strong>${phone?.mainFeatures?.memory}</p>
<p class="text-base text-[#706F6F] mb-3"><strong class="text-[#403F3F]">Release data : </strong>${phone?.releaseDate}</p>
<p class="text-base text-[#706F6F] mb-3"><strong class="text-[#403F3F]">Brand : </strong>${phone?.brand}</p>
<p class="text-base text-[#706F6F] mb-3"><strong class="text-[#403F3F]">GPS : </strong>${phone?.others?.GPS ?? "Unknown"}
</p>
  `;

};

loadPhone();