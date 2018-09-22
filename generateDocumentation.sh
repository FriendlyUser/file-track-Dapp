#!/bin/bash 

#rm -R docs/contracts
#mkdir docs/contracts
cd contracts

for filename in *.sol; do
    echo "Working on $filename"
    name=$(echo "$filename" | cut -f 1 -d '.')
    echo "$name"
    solmd $filename --dest "../docs/sm-$name.md"
    #echo '---\nid: $name\ntitle: Contract $name\n---' | cat - "../docs/$name.md" > temp && mv temp 
    sed -i '1s/^/---\n/' "../docs/sm-$name.md"
    sed -i '1s/^/title: Contract ${name} \n/' "../docs/sm-$name.md"
    sed -i '1s/^/id: ${nameNone} \n/' "../docs/sm-$name.md"
    sed -i '1s/^/---\n/' "../docs/sm-$name.md"
    # Replace the garbage with Actually content
    newName="sm-$name"
    sed -i -e 's/${name}/'${filename}'/g' "../docs/sm-$name.md"
    sed -i -e 's/${nameNone}/'${newName}'/g' "../docs/sm-$name.md"
done
cd ../
#python solcdog.py -g ../contracts/Users.sol -o Users.sol

