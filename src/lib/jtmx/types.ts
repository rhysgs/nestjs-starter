declare namespace JTMX {
  type Booleanish = boolean | 'true' | 'false';
  type CrossOrigin = 'anonymous' | 'use-credentials' | '' | undefined;
  type AriaRole =
    | 'alert'
    | 'alertdialog'
    | 'application'
    | 'article'
    | 'banner'
    | 'button'
    | 'cell'
    | 'checkbox'
    | 'columnheader'
    | 'combobox'
    | 'complementary'
    | 'contentinfo'
    | 'definition'
    | 'dialog'
    | 'directory'
    | 'document'
    | 'feed'
    | 'figure'
    | 'form'
    | 'grid'
    | 'gridcell'
    | 'group'
    | 'heading'
    | 'img'
    | 'link'
    | 'list'
    | 'listbox'
    | 'listitem'
    | 'log'
    | 'main'
    | 'marquee'
    | 'math'
    | 'menu'
    | 'menubar'
    | 'menuitem'
    | 'menuitemcheckbox'
    | 'menuitemradio'
    | 'navigation'
    | 'none'
    | 'note'
    | 'option'
    | 'presentation'
    | 'progressbar'
    | 'radio'
    | 'radiogroup'
    | 'region'
    | 'row'
    | 'rowgroup'
    | 'rowheader'
    | 'scrollbar'
    | 'search'
    | 'searchbox'
    | 'separator'
    | 'slider'
    | 'spinbutton'
    | 'status'
    | 'switch'
    | 'tab'
    | 'table'
    | 'tablist'
    | 'tabpanel'
    | 'term'
    | 'textbox'
    | 'timer'
    | 'toolbar'
    | 'tooltip'
    | 'tree'
    | 'treegrid'
    | 'treeitem'
    | (string & {});

  // All the WAI-ARIA 1.1 attributes from https://www.w3.org/TR/wai-aria-1.1/
  interface AriaAttributes {
    /** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
    'aria-activedescendant'?: string;
    /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
    'aria-atomic'?: Booleanish;
    /**
     * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
     * presented if they are made.
     */
    'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both';
    /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
    /**
     * Defines a string value that labels the current element, which is intended to be converted into Braille.
     * @see aria-label.
     */
    'aria-braillelabel'?: string;
    /**
     * Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.
     * @see aria-roledescription.
     */
    'aria-brailleroledescription'?: string;
    'aria-busy'?: Booleanish;
    /**
     * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
     * @see aria-pressed @see aria-selected.
     */
    'aria-checked'?: boolean | 'false' | 'mixed' | 'true';
    /**
     * Defines the total number of columns in a table, grid, or treegrid.
     * @see aria-colindex.
     */
    'aria-colcount'?: number;
    /**
     * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
     * @see aria-colcount @see aria-colspan.
     */
    'aria-colindex'?: number;
    /**
     * Defines a human readable text alternative of aria-colindex.
     * @see aria-rowindextext.
     */
    'aria-colindextext'?: string;
    /**
     * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
     * @see aria-colindex @see aria-rowspan.
     */
    'aria-colspan'?: number;
    /**
     * Identifies the element (or elements) whose contents or presence are controlled by the current element.
     * @see aria-owns.
     */
    'aria-controls'?: string;
    /** Indicates the element that represents the current item within a container or set of related elements. */
    'aria-current'?:
      | boolean
      | 'false'
      | 'true'
      | 'page'
      | 'step'
      | 'location'
      | 'date'
      | 'time';
    /**
     * Identifies the element (or elements) that describes the object.
     * @see aria-labelledby
     */
    'aria-describedby'?: string;
    /**
     * Defines a string value that describes or annotates the current element.
     * @see related aria-describedby.
     */
    'aria-description'?: string;
    /**
     * Identifies the element that provides a detailed, extended description for the object.
     * @see aria-describedby.
     */
    'aria-details'?: string;
    /**
     * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
     * @see aria-hidden @see aria-readonly.
     */
    'aria-disabled'?: Booleanish;
    /**
     * Indicates what functions can be performed when a dragged object is released on the drop target.
     * @deprecated in ARIA 1.1
     */
    'aria-dropeffect'?: 'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup';
    /**
     * Identifies the element that provides an error message for the object.
     * @see aria-invalid @see aria-describedby.
     */
    'aria-errormessage'?: string;
    /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
    'aria-expanded'?: Booleanish;
    /**
     * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
     * allows assistive technology to override the general default of reading in document source order.
     */
    'aria-flowto'?: string;
    /**
     * Indicates an element's "grabbed" state in a drag-and-drop operation.
     * @deprecated in ARIA 1.1
     */
    'aria-grabbed'?: Booleanish;
    /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
    'aria-haspopup'?:
      | boolean
      | 'false'
      | 'true'
      | 'menu'
      | 'listbox'
      | 'tree'
      | 'grid'
      | 'dialog';
    /**
     * Indicates whether the element is exposed to an accessibility API.
     * @see aria-disabled.
     */
    'aria-hidden'?: Booleanish;
    /**
     * Indicates the entered value does not conform to the format expected by the application.
     * @see aria-errormessage.
     */
    'aria-invalid'?: boolean | 'false' | 'true' | 'grammar' | 'spelling';
    /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
    'aria-keyshortcuts'?: string;
    /**
     * Defines a string value that labels the current element.
     * @see aria-labelledby.
     */
    'aria-label'?: string;
    /**
     * Identifies the element (or elements) that labels the current element.
     * @see aria-describedby.
     */
    'aria-labelledby'?: string;
    /** Defines the hierarchical level of an element within a structure. */
    'aria-level'?: number;
    /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
    'aria-live'?: 'off' | 'assertive' | 'polite';
    /** Indicates whether an element is modal when displayed. */
    'aria-modal'?: Booleanish;
    /** Indicates whether a text box accepts multiple lines of input or only a single line. */
    'aria-multiline'?: Booleanish;
    /** Indicates that the user may select more than one item from the current selectable descendants. */
    'aria-multiselectable'?: Booleanish;
    /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
    'aria-orientation'?: 'horizontal' | 'vertical';
    /**
     * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
     * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
     * @see aria-controls.
     */
    'aria-owns'?: string;
    /**
     * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
     * A hint could be a sample value or a brief description of the expected format.
     */
    'aria-placeholder'?: string;
    /**
     * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
     * @see aria-setsize.
     */
    'aria-posinset'?: number;
    /**
     * Indicates the current "pressed" state of toggle buttons.
     * @see aria-checked @see aria-selected.
     */
    'aria-pressed'?: boolean | 'false' | 'mixed' | 'true';
    /**
     * Indicates that the element is not editable, but is otherwise operable.
     * @see aria-disabled.
     */
    'aria-readonly'?: Booleanish;
    /**
     * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
     * @see aria-atomic.
     */
    'aria-relevant'?:
      | 'additions'
      | 'additions removals'
      | 'additions text'
      | 'all'
      | 'removals'
      | 'removals additions'
      | 'removals text'
      | 'text'
      | 'text additions'
      | 'text removals';
    /** Indicates that user input is required on the element before a form may be submitted. */
    'aria-required'?: Booleanish;
    /** Defines a human-readable, author-localized description for the role of an element. */
    'aria-roledescription'?: string;
    /**
     * Defines the total number of rows in a table, grid, or treegrid.
     * @see aria-rowindex.
     */
    'aria-rowcount'?: number;
    /**
     * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
     * @see aria-rowcount @see aria-rowspan.
     */
    'aria-rowindex'?: number;
    /**
     * Defines a human readable text alternative of aria-rowindex.
     * @see aria-colindextext.
     */
    'aria-rowindextext'?: string;
    /**
     * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
     * @see aria-rowindex @see aria-colspan.
     */
    'aria-rowspan'?: number;
    /**
     * Indicates the current "selected" state of various widgets.
     * @see aria-checked @see aria-pressed.
     */
    'aria-selected'?: Booleanish;
    /**
     * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
     * @see aria-posinset.
     */
    'aria-setsize'?: number;
    /** Indicates if items in a table or grid are sorted in ascending or descending order. */
    'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other';
    /** Defines the maximum allowed value for a range widget. */
    'aria-valuemax'?: number;
    /** Defines the minimum allowed value for a range widget. */
    'aria-valuemin'?: number;
    /**
     * Defines the current value for a range widget.
     * @see aria-valuetext.
     */
    'aria-valuenow'?: number;
    /** Defines the human readable text alternative of aria-valuenow for a range widget. */
    'aria-valuetext'?: string;
  }

  interface HTMLAttributes extends AriaAttributes {
    id?: string;
    class?: string;
    style?: string;
    crossorigin?: string;
    integrity?: string;
    src?: string;
  }

  interface HTMXAttributes {
    /** add or remove progressive enhancement for links and forms */
    'hx-boost'?: string;
    /** issues a GET to the specified URL */
    'hx-get'?: string;
    /** issues a POST to the specified URL */
    'hx-post'?: string;
    /** handle events with a inline scripts on elements */
    'hx-on*'?: string;
    /** pushes the URL into the browser location bar, creating a new history entry */
    'hx-push-url'?: string;
    /** select content to swap in from a response */
    'hx-select'?: string;
    /** select content to swap in from a response, out of band (somewhere other than the target) */
    'hx-select-oob'?: string;
    /** controls how content is swapped in (outerHTML, beforeend, afterend, …) */
    'hx-swap'?: string;
    /** marks content in a response to be out of band (should swap in somewhere other than the target) */
    'hx-swap-oob'?: string;
    /** specifies the target element to be swapped */
    'hx-target'?: string;
    /** specifies the event that triggers the request */
    'hx-trigger'?: string;
    /** adds values to the parameters to submit with the request (JSON-formatted) */
    'hx-vals'?: string;
    /** shows a confirm() dialog before issuing a request */
    'hx-confirm'?: string;
    /** issues a DELETE to the specified URL */
    'hx-delete'?: string;
    /** disables htmx processing for the given node and any children nodes */
    'hx-disable'?: string;
    /** adds the disabled attribute to the specified elements while a request is in flight */
    'hx-disabled-elt'?: string;
    /** control and disable automatic attribute inheritance for child nodes */
    'hx-disinherit'?: string;
    /** changes the request encoding type */
    'hx-encoding'?: string;
    /** extensions to use for this element */
    'hx-ext'?: string;
    /** adds to the headers that will be submitted with the request */
    'hx-headers'?: string;
    /** prevent sensitive data being saved to the history cache */
    'hx-history'?: string;
    /** the element to snapshot and restore during history navigation */
    'hx-history-elt'?: string;
    /** include additional data in requests */
    'hx-include'?: string;
    /** the element to put the htmx-request class on during the request */
    'hx-indicator'?: string;
    /** filters the parameters that will be submitted with a request */
    'hx-params'?: string;
    /** issues a PATCH to the specified URL */
    'hx-patch'?: string;
    /** specifies elements to keep unchanged between requests */
    'hx-preserve'?: string;
    /** shows a prompt() before submitting a request */
    'hx-prompt'?: string;
    /** issues a PUT to the specified URL */
    'hx-put'?: string;
    /** replace the URL in the browser location bar */
    'hx-replace-url'?: string;
    /** configures various aspects of the request */
    'hx-request'?: string;
    /** has been moved to an extension. Documentation for older versions */
    'hx-sse'?: string;
    /** control how requests made by different elements are synchronized */
    'hx-sync'?: string;
    /** force elements to validate themselves before a request */
    'hx-validate'?: string;
    /** adds values dynamically to the parameters to submit with the request (deprecated, please use hx-vals) */
    'hx-vars'?: string;
    /** has been moved to an extension. Documentation for older versions */
    'hx-ws'?: string;
  }

  interface Attributes extends HTMLAttributes, HTMXAttributes {
    [x: string]: any;
    children?: Node;
    name?: string;
    for?: string;
    /** Hyperscript attribute */
    _?: string;
  }

  interface AnchorAttributes extends Attributes {
    href?: string;
    role?: string;
  }

  /** Element specific type overrides */
  interface ButtonAttributes extends Attributes {
    type?: 'submit' | 'reset';
  }

  interface InputAttributes extends Attributes {
    type?:
      | 'email'
      | 'button'
      | 'checkbox'
      | 'color'
      | 'date'
      | 'datetime-local'
      | 'email'
      | 'file'
      | 'hidden'
      | 'image'
      | 'month'
      | 'number'
      | 'password'
      | 'radio'
      | 'range'
      | 'reset'
      | 'search'
      | 'submit'
      | 'tel'
      | 'text'
      | 'time'
      | 'url'
      | 'week';
    name?: string;
    value?: string;
    checked?: Booleanish;
    disabled?: Booleanish;
  }

  interface LinkAttributes extends Attributes {
    rel: 'stylesheet';
    href: string;
  }

  interface DialogAttributes extends Attributes {
    open?: Booleanish;
  }

  interface MetaAttributes extends Attributes {
    'char-set'?: 'utf-8';
    name?: string;
    content?: string;
  }

  /** Final definitions */
  type Element = string;
  type Node = string | number | Element | Iterable<Node>;

  type BaseComponentProps = {
    children: Node;
  };

  type Component<TProps> = (props: TProps) => Element;

  interface IntrinsicElements {
    a: AnchorAttributes;
    body: Attributes;
    button: ButtonAttributes;
    dialog: DialogAttributes;
    div: Attributes;
    fieldset: Attributes;
    footer: Attributes;
    form: Attributes;
    head: Attributes;
    html: Attributes;
    h1: Attributes;
    h2: Attributes;
    h3: Attributes;
    h4: Attributes;
    h5: Attributes;
    input: InputAttributes;
    legend: Attributes;
    nav: Attributes;
    main: Attributes;
    meta: MetaAttributes;
    label: Attributes;
    link: LinkAttributes;
    p: Attributes;
    script: Attributes;
    strong: Attributes;
    title: Attributes;
    ul: Attributes;
    li: Attributes;
  }
}

declare namespace JSX {
  type Element = JTMX.Element;

  interface ElementChildrenAttribute {
    children: {};
  }

  interface IntrinsicElements extends JTMX.IntrinsicElements {}
}
