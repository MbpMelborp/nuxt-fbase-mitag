import Vue from 'vue'
import VueTailwind from 'vue-tailwind'

import {
  TInput,
  TTextarea,
  TSelect,
  //   TRadio,
  TCheckbox,
  TButton,
  //   TInputGroup,
  //   TCard,
  //   TAlert,
  TModal,
  TDropdown,
  //   TRichSelect,
  //   TPagination,
  //   TTag,
  //   TRadioGroup,
  //   TCheckboxGroup,
  //   TTable,
  //   TDatepicker,
  TToggle,
  //   TDialog,
} from 'vue-tailwind/dist/components'

const settings = {
  // Use the following syntax
  // {component-name}: {
  //   component: {importedComponentObject},
  //   props: {
  //     {propToOverride}: {newDefaultValue}
  //     {propToOverride2}: {newDefaultValue2}
  //   }
  // }
  't-input': {
    component: TInput,
    props: {
      classes:
        'block w-full mb-1 px-3 py-2 text-pink-800 placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-100 rounded shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
      // ...More settings
    },
  },
  't-button': {
    component: TButton,
    props: {
      classes:
        'block px-8 py-3 shadow-xl rounded-lg duration-300 ease-in-out text-primary-900 font-bold bg-gradient-to-r from-primary-400 hover:scale-105  to-secondary-100 focus:border-blue-500 focus:ring-2 focus:ring-primary-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
      // ...More settings
    },
  },
  't-checkbox': {
    component: TCheckbox,
    props: {
      fixedClasses:
        'transition duration-100 ease-in-out rounded shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed',
      classes: 'text-primary-500 border-primary-300 ',
      variants: {
        error: 'text-secondary-500 border-secondary-300',
        success: 'text-green-500 border-green-300',
      },
    },
  },
  't-modal': {
    component: TModal,
    props: {
      fixedClasses: {
        overlay:
          'z-40 flex  overflow-auto scrolling-touch left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-opacity-50 items-center',
        wrapper: 'relative mx-auto z-50 w-10/12 lg:w-4/12 px-3 py-12 ',
        modal: 'shadow-xl overflow-visible relative  rounded-xl',
        body: 'p-3',
        header: 'border-b p-3 rounded-t-xl text-2xl font-bold text-center',
        footer: ' p-3 rounded-b-xl',
        close:
          'flex items-center justify-center rounded-full absolute right-0 top-0 -m-3 h-8 w-8 transition duration-100 ease-in-out focus:ring-2 focus:ring-primary-500 focus:outline-none focus:ring-opacity-50',
      },
      classes: {
        overlay: 'bg-black',
        wrapper: '',
        modal: 'bg-white shadow',
        body: 'p-3',
        header: 'border-gray-100',
        footer: 'bg-white',
        close: 'bg-primary-500 text-white hover:bg-primary-800',
        closeIcon: 'fill-current h-4 w-4',
        overlayEnterClass: 'opacity-0',
        overlayEnterActiveClass: 'transition ease-out duration-100',
        overlayEnterToClass: 'opacity-100',
        overlayLeaveClass: 'opacity-100',
        overlayLeaveActiveClass: 'transition ease-in duration-75',
        overlayLeaveToClass: 'opacity-0',
        enterClass: '',
        enterActiveClass: '',
        enterToClass: '',
        leaveClass: '',
        leaveActiveClass: '',
        leaveToClass: '',
      },
      variants: {
        danger: {
          overlay: 'bg-secondary-100',
          header: 'border-secondary-50 text-secondary-700',
          close:
            'bg-secondary-50 text-secondary-700 hover:bg-secondary-200 border-secondary-100 border',
          modal: 'bg-white border border-secondary-100 shadow-lg',
          footer: 'bg-secondary-50',
        },
      },
    },
  },
  't-toggle': {
    component: TToggle,
    props: {
      fixedClasses: {
        wrapper:
          'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200',
        wrapperChecked:
          'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200  border-2 border-transparent focus:ring-2 focus:ring-primary-500 focus:outline-none focus:ring-opacity-50',
        wrapperDisabled:
          'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200 opacity-50 cursor-not-allowed',
        wrapperCheckedDisabled:
          'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200 opacity-50 cursor-not-allowed border-2 border-transparent focus:ring-2 focus:ring-primary-500 focus:outline-none focus:ring-opacity-50',
        button:
          'inline-block absolute transform translate-x-0 transition ease-in-out duration-200',
        buttonChecked:
          'inline-block absolute transform translate-x-full transition ease-in-out duration-200',
        checkedPlaceholder: 'inline-block',
        uncheckedPlaceholder: 'inline-block',
      },
      classes: {
        wrapper:
          'bg-primary-100 rounded-full border-2 border-transparent focus:ring-2 focus:ring-primary-500 focus:outline-none focus:ring-opacity-50',
        wrapperChecked: 'bg-primary-500 rounded-full',
        wrapperDisabled:
          'bg-primary-100 rounded-full border-2 border-transparent focus:ring-2 focus:ring-primary-500 focus:outline-none focus:ring-opacity-50',
        wrapperCheckedDisabled: 'bg-primary-500',
        button:
          'h-5 w-5 rounded-full bg-white shadow flex items-center justify-center text-primary-400 text-xs',
        buttonChecked:
          'h-5 w-5 rounded-full bg-white shadow flex items-center justify-center text-primary-500 text-xs',
        checkedPlaceholder:
          'rounded-full w-5 h-5 flex items-center justify-center text-primary-400 text-xs',
        uncheckedPlaceholder:
          'rounded-full w-5 h-5 flex items-center justify-center text-primary-400 text-xs',
      },
      variants: {
        danger: {
          wrapperChecked: 'bg-secondary-500 rounded-full',
          wrapperCheckedDisabled: 'bg-secondary-500 rounded-full',
        },
        success: {
          wrapperChecked: 'bg-green-500 rounded-full',
          wrapperCheckedDisabled: 'bg-green-500 rounded-full',
        },
        box: {
          wrapper:
            'bg-gray-100 rounded-sm border-2 border-transparent focus:ring-2 focus:ring-primary-500 focus:outline-none focus:ring-opacity-50',
          wrapperChecked: 'bg-primary-500 rounded-sm',
          wrapperCheckedDisabled: 'bg-primary-500 rounded-sm',
          button:
            'h-6 w-6 rounded-sm bg-white shadow flex items-center justify-center text-gray-400 text-xs',
          buttonChecked:
            'h-6 w-6 rounded-sm  bg-white shadow flex items-center justify-center text-primary-500 text-xs',
          checkedPlaceholder:
            'rounded-sm w-6 h-6 flex items-center justify-center text-gray-400 text-xs',
          uncheckedPlaceholder:
            'rounded-sm w-6 h-6 flex items-center justify-center text-gray-400 text-xs',
        },
      },
    },
  },
  't-textarea': {
    component: TTextarea,
    props: {
      classes:
        'text-sm h-32 block w-full mb-1 px-3 py-2 text-pink-800 placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-100 rounded shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
      // ...More settings
    },
  },
  't-select': {
    component: TSelect,
    props: {
      fixedClasses:
        'block w-full pl-3 pr-10 py-2 transition duration-100 ease-in-out border rounded shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
      classes:
        'text-black placeholder-gray-400 bg-white border-gray-300 focus:border-blue-500 ',
      variants: {
        danger: 'border-secondary-300 bg-secondary-50 placeholder-secondary-200 text-secondary-900',
        success:
          'border-green-300 bg-green-50 placeholder-gray-400 text-green-900',
      },
    },
  },
  't-dropdown': {
    component: TDropdown,
    props: {
      fixedClasses: {
        button:
          'flex items-center text-white block px-4 py-2 transition duration-100 ease-in-out border border-transparent rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
        wrapper: 'inline-flex flex-col',
        dropdownWrapper: 'relative z-10',
        dropdown: 'origin-top-left absolute right-0 w-56 rounded shadow mt-1',
        enterClass: 'opacity-0 scale-95',
        enterActiveClass: 'transition transform ease-out duration-100',
        enterToClass: 'opacity-100 scale-100',
        leaveClass: 'opacity-100 scale-100',
        leaveActiveClass: 'transition transform ease-in duration-75',
        leaveToClass: 'opacity-0 scale-95',
      },
      classes: {
        button: 'bg-primary-500 hover:bg-primary-600',
        dropdown: 'bg-white',
      },
      variants: {
        danger: {
          button: 'bg-secondary-500 hover:bg-secondary-600',
          dropdown: 'bg-secondary-50',
        },
      },
    },
  },
  // ...Rest of the components
}

Vue.use(VueTailwind, settings)
