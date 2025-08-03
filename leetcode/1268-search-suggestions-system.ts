// 1268. Search Suggestions System
// https://leetcode.com/problems/search-suggestions-system/
// You are given an array of strings products and a string searchWord.
// We want to design a system that suggests at most three product names from products after each character of searchWord is typed.
// Suggested products should have common prefix with the searchWord.
// If there are more than three products with a common prefix, return the three lexicographically smallest ones.
// Return a list of lists of the suggested products after each character of searchWord is typed
class TrieNode {
  children: Map<string, TrieNode>;
  isEnd: boolean;

  constructor() {
    this.children = new Map<string, TrieNode>();
    this.isEnd = false;
  }
}

// class Trie {
//     root: TrieNode;

//     constructor() {
//         this.root = new TrieNode();
//     }

//     insert(word: string): void {
//         let currNode = this.root;
//         for(const char of word){
//             if(!currNode.children.has(char)){
//                 currNode.children.set(char, new TrieNode());
//             }
//             currNode = currNode.children.get(char);
//         }
//         currNode.isEnd = true;
//     }

//     search(word: string): boolean {
//         let currNode = this.root;
//         for(const char of word){
//             if(!currNode.children.has(char)){
//                 return false;
//             }
//             currNode = currNode.children.get(char);
//         }
//         return currNode.isEnd;
//     }

//     startsWith(prefix: string): boolean {
//         let currNode = this.root;
//         for(const char of prefix){
//             if(!currNode.children.has(char)){
// 				return false;
//             }
// 			currNode = currNode.children.get(char);
//         }
//         return true;
//     }
// }

class Trie {
  wordStorage: Set<string>;
  constructor() {
    this.wordStorage = new Set();
  }

  insert(word: string): void {
    this.wordStorage.add(word);
  }

  search(word: string): boolean {
    return this.wordStorage.has(word);
  }

  startsWith(prefix: string): boolean {
    for (const word of this.wordStorage) {
      if (word.startsWith(prefix)) return true;
    }
    return false;
  }

  getSuggestions(prefix: string): string[] {
    const suggestions: string[] = [];
    for (const word of this.wordStorage) {
      if (word.startsWith(prefix)) {
        suggestions.push(word);
      }
    }
    return suggestions.sort().slice(0, 3); // Return up to 3 suggestions sorted lexicographically
  }
}

// function suggestedProducts(products: string[], searchWord: string): string[][] {
//   const trie = new Trie();
//   for (const product of products) {
//     trie.insert(product);
//   }

//   const result: string[][] = [];
//   let prefix = '';

//   for (const char of searchWord) {
//     prefix += char;
//     const suggestions = trie.getSuggestions(prefix);
//     result.push(suggestions);
//   }

//   return result;
// }

function suggestedProducts(products: string[], searchWord: string): string[][] {
  products.sort();
  const result: string[][] = [];
  let left = 0;
  let right = products.length - 1;

  for (let i = 0; i < searchWord.length; i++) {
    const prefix = searchWord.slice(0, i + 1);

    // Move left pointer to the first product that matches the prefix
    while (left <= right && !products[left].startsWith(prefix)) left++;
    // Move right pointer to the last product that matches the prefix
    while (left <= right && !products[right].startsWith(prefix)) right--;

    // Collect up to 3 suggestions
    const suggestions: string[] = [];
    // Loop over responses as long as its less or equal to right (don't collect more than we have)
    for (let j = left; j <= right && suggestions.length < 3; j++) {
      suggestions.push(products[j]);
    }
    // push suggestions
    result.push(suggestions);
  }
  return result;
}

import {assert} from 'chai';
let n: string[];
let output: string[][];
n = ['mobile', 'mouse', 'moneypot', 'monitor', 'mousepad'];
output = [
  ['mobile', 'moneypot', 'monitor'],
  ['mobile', 'moneypot', 'monitor'],
  ['mouse', 'mousepad'],
  ['mouse', 'mousepad'],
  ['mouse', 'mousepad'],
];
assert.equal(suggestedProducts(n, 'mouse'), output);

n = ['havana'];
output = [
  ['havana'],
  ['havana'],
  ['havana'],
  ['havana'],
  ['havana'],
  ['havana'],
];
assert.equal(suggestedProducts(n, 'mouse'), output);
