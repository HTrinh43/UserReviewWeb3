// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract SimpleStorage {
    mapping (string => string[]) public reviews;
    function addReview(string memory key, string memory review) public {
        reviews[key].push(review);
    }

    function getReviews(string memory key) public view returns (string[] memory) {
        return reviews[key];
    }
}