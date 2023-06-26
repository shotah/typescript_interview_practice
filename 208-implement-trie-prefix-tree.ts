// class TrieNode {
//     children: Map<string, TrieNode>;
//     isEnd: boolean;

//     constructor() {
//         this.children = new Map<string, TrieNode>();
//         this.isEnd = false;
//     }
// }

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
    wordStorage: Set<string>
    constructor() {
        this.wordStorage = new Set();
    }

    insert(word: string): void {
        this.wordStorage.add(word)
    }

    search(word: string): boolean {
        return this.wordStorage.has(word)
    }

    startsWith(prefix: string): boolean {
        for (const word of this.wordStorage) {
            if (word.startsWith(prefix)) return true;
        }
        return false;
    }
}

let trie = new Trie();
trie.insert("apple");
trie.search("apple");   // return True
trie.search("app");     // return False
trie.startsWith("app"); // return True
trie.insert("app");
trie.search("app");     // return True

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */