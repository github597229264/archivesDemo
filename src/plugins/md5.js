	/**
	 * jQuery MD5 hash algorithm function
	 * 
	 * 	<code>
	 * 		Calculate the md5 hash of a String 
	 * 		String $.md5 ( String str )
	 * 	</code>
	 * 
	 * Calculates the MD5 hash of str using the » RSA Data Security, Inc. MD5 Message-Digest Algorithm, and returns that hash. 
	 * MD5 (Message-Digest algorithm 5) is a widely-used cryptographic hash function with a 128-bit hash value. MD5 has been employed in a wide variety of security applications, and is also commonly used to check the integrity of data. The generated hash is also non-reversable. Data cannot be retrieved from the message digest, the digest uniquely identifies the data.
	 * MD5 was developed by Professor Ronald L. Rivest in 1994. Its 128 bit (16 byte) message digest makes it a faster implementation than SHA-1.
	 * This script is used to process a variable length message into a fixed-length output of 128 bits using the MD5 algorithm. It is fully compatible with UTF-8 encoding. It is very useful when u want to transfer encrypted passwords over the internet. If you plan using UTF-8 encoding in your project don't forget to set the page encoding to UTF-8 (Content-Type meta tag). 
	 * This function orginally get from the WebToolkit and rewrite for using as the jQuery plugin.
	 * 
	 * Example
	 * 	Code
	 * 		<code>
	 * 			$.md5("I'm Persian."); 
	 * 		</code>
	 * 	Result
	 * 		<code>
	 * 			"b8c901d0f02223f9761016cfff9d68df"
	 * 		</code>
	 * 
	 * @alias Muhammad Hussein Fattahizadeh < muhammad [AT] semnanweb [DOT] com >
	 * @link http://www.semnanweb.com/jquery-plugin/md5.html
	 * @see http://www.webtoolkit.info/
	 * @license http://www.gnu.org/licenses/gpl.html [GNU General Public License]
	 * @param {jQuery} {md5:function(string))
	 * @return string
	 */
	import md5 from 'js-md5'
 
	export default {
	  install: function (Vue) {
	    Object.defineProperty(Vue.prototype, '$md5', { value: md5 })
	  }
	}
	