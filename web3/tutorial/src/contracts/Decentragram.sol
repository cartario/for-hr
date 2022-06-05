pragma solidity ^0.5.0;

contract Decentragram {
    string public name = "Decentragram";
    string public hey = "Mothefucker!!!";

    //Store images
    uint256 public imageCount = 0;
    mapping(uint256 => Image) public images;

    struct Image {
        uint256 id;
        string hash; //ipfs location
        string description;
        uint256 tipAmount;
        address payable author;
    }

    event ImageCreated(
        uint256 id,
        string hash,
        string description,
        uint256 tipAmount,
        address payable author
    );

    event ImageTipped(
        uint256 id,
        string hash,
        string description,
        uint256 tipAmount,
        address payable author
    );

    //Create images
    function uploadImage(string memory _hash, string memory _description)
        public
    {
        require(bytes(_hash).length > 0, "Hash is empty");
        require(bytes(_description).length > 0, "Description is empty");
        require(msg.sender != address(0), "Address is empty");

        imageCount++;

        //add image to conract
        images[imageCount] = Image(
            imageCount,
            _hash,
            _description,
            0,
            msg.sender
        );

        //trigger event
        emit ImageCreated(imageCount, _hash, _description, 0, msg.sender);
    }

    //Tip images
    function tipImageOwner(uint256 _id) public payable {
        // make sure id is valid
        require(_id > 0 && _id <= imageCount, "id not correct");
        // fetch image
        Image memory _image = images[_id];
        // fetch author
        address payable _author = _image.author;
        //pay to author of image
        address(_author).transfer(msg.value);
        // increment tipAmmount;
        _image.tipAmount += msg.value;
        // update the image
        images[_id] = _image;

        emit ImageTipped(
            _id,
            _image.hash,
            _image.description,
            _image.tipAmount,
            _author
        );
    }
}
