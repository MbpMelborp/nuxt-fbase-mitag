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
  //   TDropdown,
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
        'block w-full mb-1 px-3 py-2 text-pink-800 placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-100 rounded shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
      // ...More settings
    },
  },
  't-button': {
    component: TButton,
    props: {
      classes:
        'block px-8 py-3 shadow-xl rounded-lg duration-300 ease-in-out text-orange-900 font-bold bg-gradient-to-r from-orange-400 hover:scale-105  to-yellow-500 focus:border-blue-500 focus:ring-2 focus:ring-orange-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
      // ...More settings
    },
  },
  't-checkbox': {
    component: TCheckbox,
    props: {
      fixedClasses:
        'transition duration-100 ease-in-out rounded shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed',
      classes: 'text-orange-500 border-orange-300 ',
      variants: {
        error: 'text-red-500 border-red-300',
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
          'flex items-center justify-center rounded-full absolute right-0 top-0 -m-3 h-8 w-8 transition duration-100 ease-in-out focus:ring-2 focus:ring-orange-500 focus:outline-none focus:ring-opacity-50',
      },
      classes: {
        overlay: 'bg-black',
        wrapper: '',
        modal: 'bg-white shadow',
        body: 'p-3',
        header: 'border-gray-100',
        footer: 'bg-white',
        close: 'bg-orange-500 text-white hover:bg-orange-800',
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
          overlay: 'bg-red-100',
          header: 'border-red-50 text-red-700',
          close:
            'bg-red-50 text-red-700 hover:bg-red-200 border-red-100 border',
          modal: 'bg-white border border-red-100 shadow-lg',
          footer: 'bg-red-50',
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
          'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200  border-2 border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none focus:ring-opacity-50',
        wrapperDisabled:
          'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200 opacity-50 cursor-not-allowed',
        wrapperCheckedDisabled:
          'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200 opacity-50 cursor-not-allowed border-2 border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none focus:ring-opacity-50',
        button:
          'inline-block absolute transform translate-x-0 transition ease-in-out duration-200',
        buttonChecked:
          'inline-block absolute transform translate-x-full transition ease-in-out duration-200',
        checkedPlaceholder: 'inline-block',
        uncheckedPlaceholder: 'inline-block',
      },
      classes: {
        wrapper:
          'bg-orange-100 rounded-full border-2 border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none focus:ring-opacity-50',
        wrapperChecked: 'bg-orange-500 rounded-full',
        wrapperDisabled:
          'bg-orange-100 rounded-full border-2 border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none focus:ring-opacity-50',
        wrapperCheckedDisabled: 'bg-orange-500',
        button:
          'h-5 w-5 rounded-full bg-white shadow flex items-center justify-center text-orange-400 text-xs',
        buttonChecked:
          'h-5 w-5 rounded-full bg-white shadow flex items-center justify-center text-orange-500 text-xs',
        checkedPlaceholder:
          'rounded-full w-5 h-5 flex items-center justify-center text-orange-400 text-xs',
        uncheckedPlaceholder:
          'rounded-full w-5 h-5 flex items-center justify-center text-orange-400 text-xs',
      },
      variants: {
        danger: {
          wrapperChecked: 'bg-red-500 rounded-full',
          wrapperCheckedDisabled: 'bg-red-500 rounded-full',
        },
        success: {
          wrapperChecked: 'bg-green-500 rounded-full',
          wrapperCheckedDisabled: 'bg-green-500 rounded-full',
        },
        box: {
          wrapper:
            'bg-gray-100 rounded-sm border-2 border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none focus:ring-opacity-50',
          wrapperChecked: 'bg-orange-500 rounded-sm',
          wrapperCheckedDisabled: 'bg-orange-500 rounded-sm',
          button:
            'h-6 w-6 rounded-sm bg-white shadow flex items-center justify-center text-gray-400 text-xs',
          buttonChecked:
            'h-6 w-6 rounded-sm  bg-white shadow flex items-center justify-center text-orange-500 text-xs',
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
        'text-sm h-32 block w-full mb-1 px-3 py-2 text-pink-800 placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-100 rounded shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
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
        danger: 'border-red-300 bg-red-50 placeholder-red-200 text-red-900',
        success:
          'border-green-300 bg-green-50 placeholder-gray-400 text-green-900',
      },
    },
  },
  // ...Rest of the components
}

Vue.use(VueTailwind, settings)
