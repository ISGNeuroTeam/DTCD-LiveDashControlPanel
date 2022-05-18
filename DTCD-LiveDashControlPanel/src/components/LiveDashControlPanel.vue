<template>
  <div class="LiveDashControlPanel">
    <!--<button class="DragButton">
      <svg width="6" height="25" viewBox="0 0 6 22" xmlns="http://www.w3.org/2000/svg">
        <circle cx="1" cy="1" r="1" fill="#C6C6D4"/>
        <circle cx="5" cy="1" r="1" fill="#C6C6D4"/>
        <circle cx="1" cy="5" r="1" fill="#C6C6D4"/>
        <circle cx="5" cy="5" r="1" fill="#C6C6D4"/>
        <circle cx="1" cy="9" r="1" fill="#C6C6D4"/>
        <circle cx="5" cy="9" r="1" fill="#C6C6D4"/>
        <circle cx="1" cy="13" r="1" fill="#C6C6D4"/>
        <circle cx="5" cy="13" r="1" fill="#C6C6D4"/>
        <circle cx="1" cy="17" r="1" fill="#C6C6D4"/>
        <circle cx="5" cy="17" r="1" fill="#C6C6D4"/>
        <circle cx="1" cy="21" r="1" fill="#C6C6D4"/>
        <circle cx="5" cy="21" r="1" fill="#C6C6D4"/>
      </svg>
    </button>-->

    <div class="InputWrapper">
      <base-input
        placeholder="Graph name..."
        :value="inputGraphNameValue"
        @input="event => (inputGraphNameValue = event.target.value)"
        @focus="doEditGraphName = true"
        @blur="handleInputGraphNameBlur"
      ></base-input>
      <!--<svg
        v-if="doEditGraphName == false"
        class="InputIcon type_edit"
        width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2.21 10.2893C2.06974 10.2891 1.93603 10.2299 1.8415 10.1263C1.74522 10.0236 1.69738 9.88459 1.71 9.74433L1.8325 8.39733L7.4915 2.74033L9.25999 4.50833L3.6025 10.1648L2.2555 10.2873C2.24 10.2888 2.2245 10.2893 2.21 10.2893ZM9.61299 4.15483L7.845 2.38683L8.90549 1.32633C8.99928 1.23244 9.12654 1.17969 9.25924 1.17969C9.39195 1.17969 9.51921 1.23244 9.61299 1.32633L10.6735 2.38683C10.7674 2.48062 10.8201 2.60788 10.8201 2.74058C10.8201 2.87329 10.7674 3.00055 10.6735 3.09433L9.61349 4.15433L9.61299 4.15483Z" fill="#938FA0"/>
      </svg>-->
      <button v-if="doEditGraphName" class="InputIcon type_close" @click="cancelEditGraphInfo">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.2861 2.40643L9.37971 1.5L5.78613 5.09357L2.19256 1.5L1.28613 2.40643L4.8797 6L1.28613 9.59357L2.19256 10.5L5.78613 6.90643L9.37971 10.5L10.2861 9.59357L6.69256 6L10.2861 2.40643Z"
            fill="#938FA0"
          />
        </svg>
      </button>
    </div>

    <div class="Buttons">
      <base-tooltip content="Create new graph" placement="bottom">
        <base-icon-button @click="publishEvent('ClearGraph')">
          <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.9998 14.6668H3.99984C3.26346 14.6668 2.6665 14.0699 2.6665 13.3335V2.66683C2.6665 1.93045 3.26346 1.3335 3.99984 1.3335H8.6665C8.67377 1.33381 8.68095 1.33516 8.68784 1.3375C8.69435 1.33951 8.70105 1.34085 8.70784 1.3415C8.76663 1.34526 8.82467 1.35669 8.8805 1.3755L8.89917 1.3815C8.91428 1.38662 8.92899 1.39286 8.94317 1.40016C9.0158 1.43245 9.08198 1.47762 9.1385 1.5335L13.1385 5.5335C13.1944 5.59002 13.2396 5.6562 13.2718 5.72883C13.2785 5.7435 13.2832 5.75883 13.2885 5.77416L13.2945 5.7915C13.3131 5.84709 13.3241 5.90495 13.3272 5.9635C13.3282 5.96962 13.3298 5.97564 13.3318 5.9815C13.333 5.98764 13.3335 5.99391 13.3333 6.00016V13.3335C13.3333 14.0699 12.7362 14.6668 11.9998 14.6668ZM3.99984 2.66683V13.3335H11.9998V6.66683H8.6665C8.29831 6.66683 7.99984 6.36835 7.99984 6.00016V2.66683H3.99984ZM9.33317 3.6095V5.3335H11.0572L9.33317 3.6095Z"
            />
          </svg>
        </base-icon-button>
      </base-tooltip>

      <base-tooltip content="Delete current graph" placement="bottom">
        <base-icon-button @click="deleteFromServer">
          <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.3328 14.6668H4.66618C3.9298 14.6668 3.33285 14.0699 3.33285 13.3335V4.66683H1.99951V3.3335H4.66618V2.66683C4.66618 1.93045 5.26313 1.3335 5.99951 1.3335H9.99951C10.7359 1.3335 11.3328 1.93045 11.3328 2.66683V3.3335H13.9995V4.66683H12.6662V13.3335C12.6662 14.0699 12.0692 14.6668 11.3328 14.6668ZM4.66618 4.66683V13.3335H11.3328V4.66683H4.66618ZM5.99951 2.66683V3.3335H9.99951V2.66683H5.99951ZM9.99951 12.0002H8.66618V6.00016H9.99951V12.0002ZM7.33285 12.0002H5.99951V6.00016H7.33285V12.0002Z"
            />
          </svg>
        </base-icon-button>
      </base-tooltip>

      <span class="ButtonsSeparator"></span>

      <base-tooltip content="Open from file" placement="bottom">
        <base-icon-button @click="publishEvent('OpenFromFile')">
          <svg width="17" height="16" viewBox="0 0 17 16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.332 14H3.66536C2.92898 14 2.33203 13.403 2.33203 12.6667V3.33333C2.33203 2.59695 2.92898 2 3.66536 2H7.66536C7.84216 2 8.0117 2.0703 8.1367 2.19533L9.2747 3.33333H14.332C15.0684 3.33333 15.6654 3.93029 15.6654 4.66667V12.6667C15.6654 13.403 15.0684 14 14.332 14ZM3.66536 4.66667V12.6667H14.332V4.66667H3.66536Z"
            />
          </svg>
        </base-icon-button>
      </base-tooltip>
      <!-- 
      <div class="GraphListDropDownWrapper">
        <base-tooltip content="Open from server" placement="bottom">
          <base-icon-button>
            <svg
              v-if="!graphListIsActive"
              @click="toSelectNewGraph"
              width="18"
              height="16"
              viewBox="0 0 18 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_2269_3767)">
                <path
                  d="M13.6688 13.3332H4.99975C2.91542 13.3345 1.17929 11.7358 1.00955 9.65898C0.83982 7.58215 2.29335 5.72294 4.35024 5.38591C5.29698 3.70784 7.07374 2.66892 9.00086 2.66654C10.2025 2.662 11.3698 3.06745 12.3098 3.81591C13.2328 4.54782 13.889 5.56323 14.177 6.70525C15.9 6.96993 17.1283 8.51693 16.9951 10.2546C16.8619 11.9924 15.4121 13.3342 13.6688 13.3332ZM9.00086 3.99991C7.55493 4.00162 6.22187 4.78131 5.51189 6.04058L5.19981 6.59991L4.56696 6.70325C3.20011 6.93218 2.23632 8.16944 2.34916 9.55037C2.46199 10.9313 3.61385 11.9958 4.99975 11.9999H13.6688C14.7148 12.001 15.5851 11.1963 15.6655 10.1537C15.7459 9.11107 15.0094 8.18251 13.9756 8.02325L13.098 7.88991L12.8833 7.02858C12.44 5.24645 10.8378 3.99655 9.00086 3.99991ZM9.00086 10.6666L6.33345 7.99991H8.03393V5.99991H9.9678V7.99991H11.6683L9.00086 10.6666Z"
                />
              </g>
              <defs>
                <clipPath id="clip0_2269_3767">
                  <rect width="16.0044" height="16" fill="white" transform="translate(0.998535)" />
                </clipPath>
              </defs>
            </svg>
            <svg
              v-else
              @click="graphListIsActive = false"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.0002 8.28799L5.99023 14.298L7.40423 15.713L12.0042 11.113L16.6042 15.713L18.0112 14.298L12.0002 8.28799Z"
              />
            </svg>
          </base-icon-button>
        </base-tooltip>
        <graph-list-select
          v-show="graphListIsActive"
          ref="graphListDropDown"
          @updateOption="openFromServer"
          :currentGraphName="currentGraphName"
          :graphList="graphList"
        ></graph-list-select>
      </div> -->

      <!--<base-tooltip content="Open the graph that was saved to the 'Storage'" placement="bottom">
        <base-icon-button @click="openFromStorage">
          <svg width="17" height="16" viewBox="0 0 17 16" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.1945 5.3335H3.81163L1.33643 9.3335V10.0002C1.33643 12.2093 3.12728 14.0002 5.33642 14.0002H10.6698C12.8789 14.0002 14.6698 12.2093 14.6698 10.0002V9.3335L12.1945 5.3335ZM13.6046 9.3335L11.8116 6.3335H4.19454L2.40154 9.3335H6.1169C6.39145 10.1103 7.13228 10.6668 8.00309 10.6668C8.87391 10.6668 9.61473 10.1103 9.88929 9.3335H13.6046Z"/>
          </svg>
        </base-icon-button>
      </base-tooltip>-->

      <span class="ButtonsSeparator"></span>

      <base-tooltip content="Save to the server" placement="bottom">
        <base-icon-button @click="saveToServer">
          <svg width="17" height="16" viewBox="0 0 17 16" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.3356 13.3333V2.66666C13.3356 2.13332 12.8912 1.99999 12.6689 2H3.33561C2.80228 2 2.66895 2.44444 2.66895 2.66666V13.3333C2.66895 13.7015 2.96742 14 3.33561 14L6.66895 14L9.33561 14H12.6689C13.0371 14 13.3356 13.7015 13.3356 13.3333ZM9.33561 10.6667C9.33561 11.403 8.73866 12 8.00228 12C7.2659 12 6.66895 11.403 6.66895 10.6667C6.66895 9.93028 7.2659 9.33333 8.00228 9.33333C8.73866 9.33333 9.33561 9.93028 9.33561 10.6667ZM5.66895 3.33333C5.11666 3.33333 4.66895 3.78105 4.66895 4.33333V6.33333C4.66895 6.88562 5.11666 7.33333 5.66894 7.33333H10.3356C10.8879 7.33333 11.3356 6.88562 11.3356 6.33333V4.33333C11.3356 3.78105 10.8879 3.33333 10.3356 3.33333H5.66895Z"
            />
          </svg>
        </base-icon-button>
      </base-tooltip>

      <base-tooltip content="Download file " placement="bottom">
        <base-icon-button @click="publishEvent('SaveToFile', currentGraphName)">
          <svg width="17" height="16" viewBox="0 0 17 16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.6693 14.6668H3.33594V13.3335H12.6693V14.6668ZM8.0026 12.0002L4.0026 8.00016L4.9426 7.06016L7.33594 9.44683V1.3335H8.66927V9.44683L11.0626 7.06016L12.0026 8.00016L8.0026 12.0002Z"
            />
          </svg>
        </base-icon-button>
      </base-tooltip>

      <!--<base-tooltip content="Save to the 'Storage'" placement="bottom">
        <base-icon-button @click="publishEvent('SaveToStorage')">
          <svg width="17" height="16" viewBox="0 0 17 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.00228 14.6668C5.11161 14.6668 2.66895 13.3102 2.66895 11.7042V4.29616C2.66895 2.69016 5.11161 1.3335 8.00228 1.3335C10.8929 1.3335 13.3356 2.69016 13.3356 4.29616V11.7042C13.3356 13.3102 10.8936 14.6668 8.00228 14.6668ZM4.00228 9.9335V11.7062C4.04895 12.0748 5.54161 13.1875 8.00228 13.1875C10.4629 13.1875 11.9563 12.0715 12.0023 11.7022V9.9335C10.7885 10.6371 9.4049 10.9938 8.00228 10.9648C6.59966 10.9939 5.216 10.6371 4.00228 9.9335ZM4.00228 6.2275V8.00016C4.04895 8.36883 5.54161 9.4815 8.00228 9.4815C10.4629 9.4815 11.9563 8.3655 12.0023 7.99616V6.2275C10.7886 6.93135 9.40496 7.28833 8.00228 7.2595C6.59959 7.28837 5.21592 6.93138 4.00228 6.2275ZM8.00228 2.81483C5.54095 2.81483 4.04828 3.93083 4.00228 4.30083C4.04895 4.66683 5.54295 5.7775 8.00228 5.7775C10.4616 5.7775 11.9563 4.6615 12.0023 4.29216C11.9556 3.92483 10.4616 2.81483 8.00228 2.81483Z"/>
          </svg>
        </base-icon-button>
      </base-tooltip>-->

      <span class="ButtonsSeparator"></span>

      <base-tooltip content="Calculate graph" placement="bottom">
        <base-icon-button @click="publishEvent('StartCalculatingGraph')">
          <svg width="17" height="16" viewBox="0 0 17 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.33545 12.6668L12.6688 8.00016L5.33545 3.3335V12.6668Z" />
          </svg>
        </base-icon-button>
      </base-tooltip>

      <span class="ButtonsSeparator"></span>

      <base-tooltip content="Fit Content" placement="bottom">
        <base-icon-button @click="publishEvent('FitContent')">
          <svg width="17" height="16" viewBox="0 0 17 16" xmlns="http://www.w3.org/2000/svg">
            <mask id="path-1-inside-1_2269_3795" fill="white">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.00147 2L10.5015 3.5V6.5L8.00147 8L5.50146 6.5V3.5L8.00147 2ZM11.5015 8L14.0015 9.5V12.5L11.5015 14L9.00146 12.5V9.5L11.5015 8ZM7.00146 9.5L4.50147 8L2.00146 9.5V12.5L4.50147 14L7.00146 12.5V9.5Z"
              />
            </mask>
            <path
              d="M10.5015 3.5H11.5015V2.93381L11.016 2.64251L10.5015 3.5ZM8.00147 2L8.51596 1.14251L8.00147 0.83381L7.48697 1.14251L8.00147 2ZM10.5015 6.5L11.016 7.35749L11.5015 7.06619V6.5H10.5015ZM8.00147 8L7.48697 8.85749L8.00147 9.16619L8.51596 8.85749L8.00147 8ZM5.50146 6.5H4.50146V7.06619L4.98697 7.35749L5.50146 6.5ZM5.50146 3.5L4.98697 2.64251L4.50146 2.93381V3.5H5.50146ZM14.0015 9.5H15.0015V8.93381L14.516 8.64251L14.0015 9.5ZM11.5015 8L12.016 7.14251L11.5015 6.83381L10.987 7.14251L11.5015 8ZM14.0015 12.5L14.516 13.3575L15.0015 13.0662V12.5H14.0015ZM11.5015 14L10.987 14.8575L11.5015 15.1662L12.016 14.8575L11.5015 14ZM9.00146 12.5H8.00146V13.0662L8.48697 13.3575L9.00146 12.5ZM9.00146 9.5L8.48697 8.64251L8.00146 8.93381V9.5H9.00146ZM4.50147 8L5.01596 7.14251L4.50147 6.83381L3.98697 7.14251L4.50147 8ZM7.00146 9.5H8.00146V8.93381L7.51596 8.64251L7.00146 9.5ZM2.00146 9.5L1.48697 8.64251L1.00146 8.93381V9.5H2.00146ZM2.00146 12.5H1.00146V13.0662L1.48697 13.3575L2.00146 12.5ZM4.50147 14L3.98697 14.8575L4.50147 15.1662L5.01596 14.8575L4.50147 14ZM7.00146 12.5L7.51596 13.3575L8.00146 13.0662V12.5H7.00146ZM11.016 2.64251L8.51596 1.14251L7.48697 2.85749L9.98697 4.35749L11.016 2.64251ZM11.5015 6.5V3.5H9.50146V6.5H11.5015ZM8.51596 8.85749L11.016 7.35749L9.98697 5.64251L7.48697 7.14251L8.51596 8.85749ZM4.98697 7.35749L7.48697 8.85749L8.51596 7.14251L6.01596 5.64251L4.98697 7.35749ZM4.50146 3.5V6.5H6.50146V3.5H4.50146ZM7.48697 1.14251L4.98697 2.64251L6.01596 4.35749L8.51596 2.85749L7.48697 1.14251ZM14.516 8.64251L12.016 7.14251L10.987 8.85749L13.487 10.3575L14.516 8.64251ZM15.0015 12.5V9.5H13.0015V12.5H15.0015ZM12.016 14.8575L14.516 13.3575L13.487 11.6425L10.987 13.1425L12.016 14.8575ZM8.48697 13.3575L10.987 14.8575L12.016 13.1425L9.51596 11.6425L8.48697 13.3575ZM8.00146 9.5V12.5H10.0015V9.5H8.00146ZM10.987 7.14251L8.48697 8.64251L9.51596 10.3575L12.016 8.85749L10.987 7.14251ZM3.98697 8.85749L6.48697 10.3575L7.51596 8.64251L5.01596 7.14251L3.98697 8.85749ZM2.51596 10.3575L5.01596 8.85749L3.98697 7.14251L1.48697 8.64251L2.51596 10.3575ZM3.00146 12.5V9.5H1.00146V12.5H3.00146ZM5.01596 13.1425L2.51596 11.6425L1.48697 13.3575L3.98697 14.8575L5.01596 13.1425ZM6.48697 11.6425L3.98697 13.1425L5.01596 14.8575L7.51596 13.3575L6.48697 11.6425ZM6.00146 9.5V12.5H8.00146V9.5H6.00146Z"
              mask="url(#path-1-inside-1_2269_3795)"
            />
          </svg>
        </base-icon-button>
      </base-tooltip>

      <base-tooltip content="Zoom In" placement="bottom">
        <base-icon-button @click="publishEvent('ZoomIn')">
          <svg width="17" height="16" viewBox="0 0 17 16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.0527 13.3335L7.208 9.4895C5.77055 10.4378 3.84868 10.1444 2.75955 8.81053C1.67043 7.47663 1.7674 5.53492 2.984 4.31616C4.20254 3.09909 6.14447 3.0017 7.47866 4.09075C8.81286 5.1798 9.10637 7.10189 8.158 8.5395L12.0013 12.3842L11.0527 13.3335ZM5.35733 4.67616C4.39683 4.67555 3.56965 5.35351 3.38166 6.29543C3.19366 7.23736 3.69721 8.18091 4.58435 8.54906C5.47149 8.91722 6.49516 8.60744 7.02932 7.80917C7.56349 7.0109 7.45938 5.94647 6.78067 5.26683C6.40417 4.88772 5.89163 4.67503 5.35733 4.67616ZM12.668 7.3335H11.3347V6.00016H10.0013V4.66683H11.3347V3.3335H12.668V4.66683H14.0013V6.00016H12.668V7.3335Z"
            />
          </svg>
        </base-icon-button>
      </base-tooltip>

      <base-tooltip content="Zoom Out" placement="bottom">
        <base-icon-button @click="publishEvent('ZoomOut')">
          <svg width="17" height="16" viewBox="0 0 17 16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.0527 13.3335L7.208 9.48954C5.77055 10.4378 3.84868 10.1445 2.75955 8.81057C1.67043 7.47667 1.7674 5.53496 2.984 4.31621C4.20254 3.09914 6.14447 3.00175 7.47866 4.0908C8.81286 5.17985 9.10637 7.10194 8.158 8.53954L12.0013 12.3842L11.0527 13.3335ZM5.35733 4.6762C4.39683 4.67559 3.56965 5.35355 3.38166 6.29548C3.19366 7.2374 3.69721 8.18095 4.58435 8.54911C5.47149 8.91726 6.49516 8.60748 7.02932 7.80921C7.56349 7.01095 7.45938 5.94652 6.78067 5.26687C6.40417 4.88777 5.89163 4.67507 5.35733 4.6762ZM14.0013 6.00021H10.0013V4.66687H14.0013V6.00021Z"
            />
          </svg>
        </base-icon-button>
      </base-tooltip>

      <base-tooltip content="Zoom to original size" placement="bottom">
        <base-icon-button @click="publishEvent('ZoomOriginal')">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.02365 11.8702H4.313V6.15929L2.9758 7.49263L2 6.48968L4.52984 4H6.02365V11.8702Z"
              fill="#0579F7"
            />
            <path
              d="M9.04902 7.71681C8.85627 7.9056 8.62738 8 8.36235 8C8.09732 8 7.86843 7.9056 7.67568 7.71681C7.48293 7.52802 7.38655 7.30384 7.38655 7.04425C7.38655 6.78466 7.48293 6.56047 7.67568 6.37168C7.86843 6.18289 8.09732 6.0885 8.36235 6.0885C8.62738 6.0885 8.85627 6.18289 9.04902 6.37168C9.24177 6.56047 9.33814 6.78466 9.33814 7.04425C9.33814 7.30384 9.24177 7.52802 9.04902 7.71681ZM9.04902 11.7168C8.85627 11.9056 8.62738 12 8.36235 12C8.09732 12 7.86843 11.9056 7.67568 11.7168C7.48293 11.528 7.38655 11.3038 7.38655 11.0442C7.38655 10.7847 7.48293 10.5605 7.67568 10.3717C7.86843 10.1829 8.09732 10.0885 8.36235 10.0885C8.62738 10.0885 8.85627 10.1829 9.04902 10.3717C9.24177 10.5605 9.33814 10.7847 9.33814 11.0442C9.33814 11.3038 9.24177 11.528 9.04902 11.7168Z"
              fill="#0579F7"
            />
            <path
              d="M14 11.8702H12.2893V6.15929L10.9521 7.49263L9.97635 6.48968L12.5062 4H14V11.8702Z"
              fill="#0579F7"
            />
          </svg>
        </base-icon-button>
      </base-tooltip>

      <span class="ButtonsSeparator"></span>

      <base-tooltip content="Cut" placement="bottom">
        <base-icon-button @click="publishEvent('CutItems')">
          <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.00033 5.6335C4.00033 5.09962 4.43312 4.66683 4.96699 4.66683C5.50087 4.66683 5.93366 5.09962 5.93366 5.6335C5.93366 6.16737 5.50087 6.60016 4.96699 6.60016C4.43312 6.60016 4.00033 6.16737 4.00033 5.6335ZM4.96699 3.3335C3.69674 3.3335 2.66699 4.36324 2.66699 5.6335C2.66699 6.90375 3.69674 7.9335 4.96699 7.9335C5.63353 7.9335 6.23385 7.64996 6.65392 7.19693L7.983 8.1915L6.64385 9.1926C6.22428 8.74586 5.62822 8.46683 4.96699 8.46683C3.69674 8.46683 2.66699 9.49657 2.66699 10.7668C2.66699 12.0371 3.69674 13.0668 4.96699 13.0668C6.23725 13.0668 7.26699 12.0371 7.26699 10.7668C7.26699 10.6461 7.25769 10.5275 7.23976 10.4118L9.09587 9.02428L12.4309 11.5199C12.7257 11.7405 13.1435 11.6804 13.3641 11.3856L13.7635 10.8518L13.2297 10.4524L10.2091 8.19203L13.2295 5.93412L13.7635 5.53495L13.3643 5.00099C13.1438 4.7061 12.7261 4.64575 12.4312 4.86621L9.09627 7.35926L7.24227 5.97189C7.25856 5.86145 7.26699 5.74846 7.26699 5.6335C7.26699 4.36324 6.23725 3.3335 4.96699 3.3335ZM4.00033 10.7668C4.00033 10.233 4.43312 9.80016 4.96699 9.80016C5.50087 9.80016 5.93366 10.233 5.93366 10.7668C5.93366 11.3007 5.50087 11.7335 4.96699 11.7335C4.43312 11.7335 4.00033 11.3007 4.00033 10.7668Z"
            />
          </svg>
        </base-icon-button>
      </base-tooltip>

      <base-tooltip content="Copy" placement="bottom">
        <base-icon-button @click="publishEvent('CopyItems')">
          <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.88954 11.0665C4.88954 11.582 5.32481 11.9998 5.86175 11.9998H11.695C12.2319 11.9998 12.6673 11.582 12.6673 11.0665V5.93317C12.6674 5.92879 12.6671 5.92441 12.6662 5.9201C12.6647 5.91601 12.6636 5.91179 12.6628 5.9075C12.6606 5.86652 12.6526 5.82602 12.639 5.7871L12.6347 5.77497C12.6338 5.7725 12.6329 5.77002 12.632 5.76755C12.6291 5.75931 12.6262 5.75114 12.6225 5.74324C12.599 5.6924 12.566 5.64607 12.5253 5.6065L9.60865 2.8065C9.56743 2.76739 9.51918 2.73577 9.46622 2.71317C9.45588 2.70806 9.44515 2.70369 9.43413 2.7001L9.42052 2.6959C9.37982 2.68274 9.33749 2.67474 9.29462 2.6721C9.28968 2.67165 9.28479 2.67071 9.28004 2.6693C9.27502 2.66767 9.26978 2.66672 9.26448 2.6665H5.86175C5.32481 2.6665 4.88954 3.08437 4.88954 3.59984V11.0665ZM5.86175 11.0665V3.59984H8.77838V5.93317C8.77838 6.1909 8.99602 6.39984 9.26448 6.39984H11.695V11.0665H5.86175ZM9.75059 5.4665V4.2597L11.0077 5.4665H9.75059ZM10.1395 13.5554H4.30619C3.76926 13.5554 3.33398 13.1375 3.33398 12.6221V5.15539C3.33398 4.63993 3.76926 4.22206 4.30619 4.22206V5.15539V12.6221H10.1395H11.1117C11.1117 13.1375 10.6764 13.5554 10.1395 13.5554Z"
              fill="#0579F7"
            />
          </svg>
        </base-icon-button>
      </base-tooltip>

      <base-tooltip content="Paste" placement="bottom">
        <base-icon-button @click="publishEvent('PasteItems')">
          <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.86126 12.0003C5.32432 12.0003 4.88905 11.5825 4.88905 11.067V3.60033C4.88905 3.08486 5.32432 2.66699 5.86126 2.66699H8.77789V3.60033V5.93366C8.77789 6.19139 8.99553 6.40033 9.264 6.40033H11.6945H12.6668V11.067C12.6668 11.5825 12.2315 12.0003 11.6945 12.0003H5.86126ZM9.7501 4.26019V2.94326L12.379 5.46699H11.0072H9.7501V4.26019ZM10.139 13.5559H4.30571C3.76877 13.5559 3.3335 13.138 3.3335 12.6225V5.15588C3.3335 4.64041 3.76877 4.22255 4.30571 4.22255V5.15588V12.6225H10.139H11.1112C11.1112 13.138 10.6759 13.5559 10.139 13.5559Z"
            />
          </svg>
        </base-icon-button>
      </base-tooltip>

      <base-tooltip content="Delete" placement="bottom">
        <base-icon-button @click="publishEvent('DeleteItems')">
          <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.3338 14.6668H4.66716C3.93078 14.6668 3.33382 14.0699 3.33382 13.3335V4.66683H2.00049V3.3335H4.66716V2.66683C4.66716 1.93045 5.26411 1.3335 6.00049 1.3335H10.0005C10.7369 1.3335 11.3338 1.93045 11.3338 2.66683V3.3335H14.0005V4.66683H12.6672V13.3335C12.6672 14.0699 12.0702 14.6668 11.3338 14.6668ZM4.66716 4.66683V13.3335H11.3338V4.66683H4.66716ZM6.00049 2.66683V3.3335H10.0005V2.66683H6.00049Z"
              fill="#0579F7"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.66716 4.66683V13.3335H11.3338V4.66683H4.66716ZM10.0005 12.0002H8.66716V6.00016H10.0005V12.0002ZM6.00049 12.0002H7.33382V6.00016H6.00049V12.0002Z"
            />
          </svg>
        </base-icon-button>
      </base-tooltip>

      <span class="ButtonsSeparator"></span>

      <base-tooltip content="Undo" placement="bottom">
        <base-icon-button @click="publishEvent('UndoGraph')">
          <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 2.6665H5.33333V4.37123C6.12668 3.74784 7.12707 3.37604 8.2143 3.37604C10.7916 3.37604 12.881 5.46538 12.881 8.0427C12.881 10.62 10.7916 12.7094 8.2143 12.7094C6.78064 12.7094 5.49797 12.0629 4.64193 11.0455L5.72148 10.2557C6.33208 10.943 7.22261 11.376 8.2143 11.376C10.0552 11.376 11.5476 9.88365 11.5476 8.0427C11.5476 6.20176 10.0552 4.70937 8.2143 4.70937C7.48973 4.70937 6.81917 4.94055 6.27233 5.33317L8 5.33317V6.6665H4V2.6665Z"
            />
          </svg>
        </base-icon-button>
      </base-tooltip>

      <base-tooltip content="Redo" placement="bottom">
        <base-icon-button @click="publishEvent('RedoGraph')">
          <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.0006 2.6665H10.6673V4.37123C9.87392 3.74784 8.87353 3.37604 7.7863 3.37604C5.20897 3.37604 3.11963 5.46538 3.11963 8.0427C3.11963 10.62 5.20897 12.7094 7.7863 12.7094C9.21995 12.7094 10.5026 12.0629 11.3587 11.0455L10.2791 10.2557C9.66852 10.943 8.77798 11.376 7.7863 11.376C5.94535 11.376 4.45296 9.88365 4.45296 8.0427C4.45296 6.20176 5.94535 4.70937 7.7863 4.70937C8.51086 4.70937 9.18142 4.94055 9.72826 5.33317L8.00059 5.33317V6.6665H12.0006V2.6665Z"
            />
          </svg>
        </base-icon-button>
      </base-tooltip>
    </div>
  </div>
</template>

<script>
import GraphListSelect from './GraphListSelect.vue';

export default {
  name: 'ControlPanel',
  components: { GraphListSelect },
  data() {
    return {
      graphListIsActive: false,
      graphList: [],
      currentGraphName: '',
      currentGraphID: null,
      inWait: false,
      doEditGraphName: false,
      inputGraphNameValue: '',
    };
  },
  mounted() {
    document.addEventListener('click', this.graphListIsActiveHandler);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.graphListIsActiveHandler);
  },
  methods: {
    publishEvent(eventName, args) {
      this.$root.eventSystem.publishEvent(eventName, args);
    },
    graphListIsActiveHandler(evt) {
      if (this.$refs.graphListDropDown && !this.$refs.graphListDropDown.$el.contains(evt.target))
        this.graphListIsActive = false;
    },
    closeSelectNewGraph() {
      this.graphListIsActive = false;
    },
    setNewGraphInfo(graphInfo) {
      if (graphInfo) {
        const { id = null, name = '' } = graphInfo;
        this.currentGraphID = id;
        this.currentGraphName = name;
        this.inputGraphNameValue = name;
      } else {
        alert('Params without graphID');
      }
    },

    deleteFromServer() {
      this.publishEvent('DeleteFromServer', { id: this.currentGraphID });
    },
    // toSelectNewGraph() {
    //   this.$root.interactionSystem.GETRequest('/mock_server/v1/graphContent/object').then(resp => {
    //     this.graphList = resp.data;
    //     this.graphListIsActive = true;
    //   });
    // },
    openFromServer(graph) {
      this.publishEvent('OpenFromServer', graph.id);
      this.graphListIsActive = false;
      this.currentGraphID = graph.id;
      this.currentGraphName = graph.name;
      this.inputGraphNameValue = graph.name;
    },

    openFromStorage() {
      console.log('storageSystem not supported');
    },

    saveToServer() {
      if (!this.inputGraphNameValue) {
        alert('Please, enter name of new graph or select saved graph!');
      } else {
        this.publishEvent('SaveToServer', {
          name: this.inputGraphNameValue.trim(),
          id: this.currentGraphID,
        });

        this.doEditGraphName = false;
      }
    },

    handleInputGraphNameBlur() {
      if (!this.inputGraphNameValue) {
        this.inputGraphNameValue = this.currentGraphName;
      }

      if (this.inputGraphNameValue === this.currentGraphName) {
        this.doEditGraphName = false;
      }
    },

    cancelEditGraphInfo() {
      this.doEditGraphName = false;
      this.inputGraphNameValue = this.currentGraphName;
    },
  },
};
</script>

<style lang="scss" scoped>
@import './LiveDashControlPanel.scss';
</style>
