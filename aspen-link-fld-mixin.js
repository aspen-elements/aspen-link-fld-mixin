/**
 * This mixin provides the methods and properties associated with fields and buttons that open
 * new windows. These components use the 'linktype' field to determine what type of link is
 * associated with the component, and how to open it.
 *
 * @polymerMixin
 * @mixinFunction
 */
export const AspenLinkFldMixin = superclass =>
  class extends superclass {
    /**
     * Object describing property-related metadata used by Polymer features
     */
    static get properties() {
      return {
        /** The type of link (the key to the map) */
        linktype: {
          type: String,
          value: ""
        },

        /** The label to be displayed in the link field */
        label: {
          type: String,
          value: ""
        },

        /** The full URL. */
        url: {
          type: String,
          computed: "_computeUrl(value, linktype)"
        },

        /** The URL value. */
        value: {
          type: String,
          value: "",
          notify: true
        },

        /** The placeholder text. */
        placeholder: {
          type: String,
          value: ""
        },

        /** The icon to be displayed. */
        icon: {
          type: String,
          value: "aspen:launch"
        },

        /** A flag that indicates that the button is disabled. */
        isDisabled: {
          type: Boolean,
          computed: "__computeIsDisabled(value)"
        },

        /** Text which describes the function of the button. */
        tooltip: {
          type: String,
          value: ""
        }
      };
    }

    /**
     * This method computes a URL using the id and the link type.
     * @param id the id of the object.
     * @param linktype the type of link to be created
     */
    _computeUrl(id, linktype) {
      let url = null;

      if (linktype) {
        const linkMap = new Map([
          ["pubmed", "https://www.ncbi.nlm.nih.gov/pubmed/"],
          ["gene", "https://www.ncbi.nlm.nih.gov/gene/"],
          ["miRNA", "https://www.mirbase.org/cgi-bin/query.pl?terms="],
          ["trial", "https://www.clinicaltrials.gov/show/"],
          ["twitter", "https://www.twitter.com/"],
          ["facebook", ""],
          [
            "linkedin-search",
            "https://www.linkedin.com/search/results/all?origin=GLOBAL_SEARCH_HEADER&keywords="
          ],
          ["google-finance", "https://google.com/finance?q="],
          ["google-map", "https://maps.google.com/maps/search/"],
          ["phone", "tel:"],
          ["mail", "mailto:"],
          ["indeed", "https://www.indeed.com/jobs?q="],
          ["trial-search", "https://clinicaltrials.gov/ct2/results?term="],
          ["sbir", "https://www.sbir.gov/search-result-page?search="]
        ]);

        let _id =
          linktype == "indeed" || linktype == "trial-search" ? `"${id}"` : id;
        url = `${linkMap.get(linktype)}${_id}`;

        if (linktype === "facebook") {
          url = this.value;
        }
      }

      return url;
    }

    /**
     * This method is responsible for handling the button click event.
     * It checks to see if there's a 'linktype' defined and if so then
     * opens the constructed URL, otherwise it uses the value directly.
     */

    __launch(e) {
      if (this.linktype) {
        window.open(this.url);
      } else {
        window.open(this.value);
      }
    }

    /**
     * This method determines if the field is disabled, by checking to see if the
     * 'value' field has been set.
     * @param {String} value the value associated with the field.
     */

    __computeIsDisabled(value) {
      return !value;
    }
  };
